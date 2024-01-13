import User from "../models/User.js";
import JWT from "jsonwebtoken";
import asynchandler from "express-async-handler";
import bcrypt from "bcrypt";

import { createOTP } from "../utils/helper.js";
import {
  sendEmail,
  sendOtp,
  sendResetPasswordEmail,
} from "../mails/sendemai.js";
import { dotsToHyphens, hyphensToDots } from "../helpers/createSlug.js";
import { uploadcloud } from "../utils/cloudnary.js";
import Chat from "../models/Chat.js";

export const UserLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email | !password) {
    res.json({ message: "all field are required" });
  }
  const user = await User.findOne({ email });
  // res.status(200).json(user)

  if (user) {
    const passverify = await bcrypt.compare(password, user.password);

    if (!passverify) {
      res.status(404).json({ message: "password not match" });
    }

    const accessToken = JWT.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.APP_ENV == "Development" ? false : true,
      maxAge: 60 * 60 * 60 * 24,
      path: "/",
    });

    res.json({
      accessToken,
      user,
      message: "loging successfull",
    });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

export const UserLogout = asynchandler((req, res) => {
  res.clearCookie("accessToken");

  res.status(200).json({ message: "logout successfull" });
});

export const meController = asynchandler(async (req, res) => {
  const Token = req.cookies.accessToken;
  if (!Token) {
    res.status(404).json({ message: "unauthoriged user" });
  } else {
    const tokencheck = JWT.verify(Token, process.env.ACCESS_TOKEN_SECRET);

    JWT.verify(Token, process.env.ACCESS_TOKEN_SECRET, async (err, decoed) => {
      if (err) {
        return res.status(400).json({ message: "invatie token" });
      }

      const me = await User.findOne({ email: decoed.email }).select(
        "-password"
      );

      res.status(200).json(me);
    });
  }
});

export const UserRegister = asynchandler(async (req, res) => {
  // get data
  console.log(req.body);
  const { name, email, password } = req.body;

  // check validation
  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existance
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // create otp
  const activationCode = createOTP(5);
  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({
    name,
    email,
    accessToken: activationCode,
    password: hash,
  });

  // check
  if (user) {
    // create verfiytoken
    let verifyToken = JWT.sign(
      { email: email, otp: activationCode },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    const tohyphen = dotsToHyphens(verifyToken);

    // send an email
    await sendEmail(
      "anisulhoque587@gmail.com",
      "welcome message",
      tohyphen,
      activationCode
    );
    //send otp
    // await sendOtp("anisulhoque587@gmail.com", "verify code", activationCode);

    //send cookie
    res.cookie("verifyToken", verifyToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(201).json({ message: "User created successful", user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// resend activation
export const ResendAcivation = asynchandler(async (req, res) => {
  try {
    // console.log(req.body);
    const { email } = req.body;

    // email existance
    const emailCheck = await User.findOne({ email });

    if (!emailCheck) {
      return res.status(400).json({ message: "Email not exists" });
    }

    // create otp
    const activationCode = createOTP(5);

    // create verfiytoken
    let verifyToken = JWT.sign(
      { email: email, otp: activationCode },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    const tohyphen = dotsToHyphens(verifyToken);

    // send an email
    await sendEmail(
      "anisulhoque587@gmail.com",
      "welcome message " + emailCheck.name,
      tohyphen,
      activationCode
    );

    //send cookie
    res.cookie("verifyToken", verifyToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "Activation link Resend  successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// verify authtoken && otp
export const VerfiyUser = asynchandler(async (req, res) => {
  // get data
  // const { name, email, password } = req.body;
  const { token } = req.params;
  let toDot = hyphensToDots(token);

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  const tokencheck = JWT.verify(toDot, process.env.ACCESS_TOKEN_SECRET);
  if (tokencheck) {
    const user = await User.findOneAndUpdate(
      { email: tokencheck.email },
      { isverfied: true, accessToken: null }
    );

    // clear cookie
    res.clearCookie("verifyToken");

    return res.status(200).json({ message: "successfully verify account" });
  } else {
    return res.status(400).json({ message: "Invalid Link" });
  }
});

// verify authtoken && otp
export const VerfiyUserByOtp = asynchandler(async (req, res) => {
  // get data
  const { otp } = req.body;
  const { token } = req.params;
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  const tokencheck = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(otp);

  if (tokencheck.otp == otp) {
    // update user
    const user = await User.findOneAndUpdate(
      { email: tokencheck.email },
      { isverfied: true, accessToken: null },
      { new: true }
    );

    // clear cookie
    res.clearCookie("verifyToken");

    return res
      .status(200)
      .json({ message: "successfully verify account", user });
  } else {
    return res.status(400).json({ message: "Wrong Otp" });
  }
});

// resend activation
export const ResendPasswordLink = asynchandler(async (req, res) => {
  try {
    // console.log(req.body);
    const { email } = req.body;

    // email existance
    const emailCheck = await User.findOne({ email });

    if (!emailCheck) {
      return res.status(400).json({ message: "Email not exists" });
    }

    // create verfiytoken
    let verifyToken = JWT.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    const tohyphen = dotsToHyphens(verifyToken);

    // send an email
    await sendResetPasswordEmail(
      email,
      "welcome message " + emailCheck.name,
      tohyphen,
      "null"
    );

    return res
      .status(201)
      .json({ message: "Activation link Resend  successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// verify authtoken && otp
export const VerfiyUserTokenPassword = asynchandler(async (req, res) => {
  // get data
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  const convate = hyphensToDots(token);
  const tokencheck = JWT.verify(convate, process.env.ACCESS_TOKEN_SECRET);

  if (tokencheck) {
    const hash = await bcrypt.hash(password, 10);

    // update user
    const user = await User.findOneAndUpdate(
      { email: tokencheck.email },
      { password: hash },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "successfully update password", user });
  } else {
    return res.status(400).json({ message: "Wrong info try agein" });
  }
});

// get all users
export const getAllUsers = asynchandler(async (req, res) => {
  // all user
  const logedUser = req.me._id;
  const users = await User.find().select("-password");
  const usersWithLatestmsg = [];
  for (let i = 0; i < users.length; i++) {
    const lastMsg = await Chat.findOne({
      $or: [
        {
          $and: [
            { senderId: { $eq: logedUser } },
            { receiverId: { $eq: users[i]._id } },
          ],
        },
        {
          $and: [
            { senderId: { $eq: users[i]._id } },
            { receiverId: { $eq: logedUser } },
          ],
        },
      ],
    }).sort({ createdAt: -1 });
    usersWithLatestmsg.push({ userInfo: users[i], lastMsg: lastMsg });
  }

  return res.status(200).json({ users: usersWithLatestmsg });
});
// upload profile photo
export const profilePhotoController = asynchandler(async (req, res) => {
  const { id } = req.params;

  const data = await uploadcloud(req.file.path);
  console.log(data);
  console.log(id);
  const user = await User.findByIdAndUpdate(
    id,
    { photo: data.secure_url },
    { new: true }
  );
  return res.status(200).json({ message: "photo update successfull", user });
});
