import User from "../models/User.js";
import JWT from "jsonwebtoken";
import asynchandler from "express-async-handler";
import bcrypt from "bcrypt";

import { createOTP } from "../utils/helper.js";
import { sendEmail, sendOtp } from "../mails/sendemai.js";
import { dotsToHyphens, hyphensToDots } from "../helpers/createSlug.js";

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
      maxAge: 1000 * 60 * 60 * 24 * 7,
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
    JWT.verify(Token, process.env.ACCESS_TOKEN, async (err, decoed) => {
      if (err) {
        return res.status(400).json({ message: "invatie token" });
      }

      const me = await User.findOne({ email: decoed.email })
        .select("-password")
        .populate("role");

      res.status(200).json({ me });
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
      { isverfied: true, accessToken: null }
    );

    // clear cookie
    res.clearCookie("verifyToken");

    return res.status(200).json({ message: "successfully verify account" });
  } else {
    return res.status(400).json({ message: "Wrong Otp" });
  }

  // const tokencheck = JWT.verify(toDot, process.env.ACCESS_TOKEN_SECRET);
});

// /// reset password contorller
// export const UserResetPassword = asynchandler(async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   // check exits email
//   if (!user) {
//     return res.status(500).json({ message: "User not found by this Email" });
//   }

//   // set token on db
//   let accessToken = JWT.sign(
//     { _id: user._id, email: user.email },
//     process.env.ACCESS_TOKEN,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
//     }
//   );
//   accessToken = accessToken.replace(/\./g, "");
//   const updatebytoken = await User.findByIdAndUpdate(user._id, {
//     token: accessToken,
//   });

//   if (!updatebytoken) {
//     return res.status(500).json({ message: "Something was wrong try again" });
//   }

//   // sendEmail(
//   // req.body.email,
//   // "Reset Passwrod",
//   // resetpasswordtemplate(user.username, process.env.CLIENT_PORT, accessToken)
//   // );

//   res.status(200).json({
//     message:
//       "Sended an link on your email " + req.body.email.slice(0, 6) + "***",
//   });
// });

// /// verfiy reset password contorller
// export const UserResetPasswordverify = asynchandler(async (req, res) => {
//   const user = await User.findOne({ token: req.body.token });

//   // // check exits email
//   if (!user) {
//     return res.status(500).json({ message: "Bad request Try agein" });
//   }
//   const hash = await bcrypt.hash(req.body.password, 10);

//   const updatedDocument = await User.findOneAndUpdate(
//     { token: req.body.token }, // The query to find the document
//     { password: hash, token: "" }, // The new data to update the document with
//     { new: true } // Set {new: true} to return the updated document instead of the original one
//   );

//   if (!updatedDocument) {
//     return res.status(500).json({ message: "Something was wrong try again" });
//   }

//   res.status(200).json({
//     message: "password update successfully",
//   });
// });

// // get all users

// export const Getalluser = asynchandler(async (req, res) => {
//   const users = await User.find();

//   res.status(200).json({
//     users,
//   });
// });
