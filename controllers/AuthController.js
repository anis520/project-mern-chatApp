import User from "../models/User.js";
import JWT from "jsonwebtoken";
import asynchandler from "express-async-handler";
import bcrypt from "bcrypt";
import sendEmail, { resetpasswordtemplate } from "../utils/sendemai.js";

export const UserLogin = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email | !password) {
    res.json({ message: "all filsed" });
  }
  const user = await User.findOne({ email }).populate("role");
  // res.status(200).json(user)

  if (user) {
    const passverify = await bcrypt.compare(password, user.password);

    if (!passverify) {
      res.json({ message: "password not match" });
    }

    const accessToken = JWT.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );
    const refreshToken = JWT.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.APP_ENV == "Development" ? false : true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    res.json({
      refreshToken,
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
  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({
    name,
    email,

    password: hash,
  });

  // check
  if (user) {
    return res.status(201).json({ message: "User created successful", user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/// reset password contorller
export const UserResetPassword = asynchandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // check exits email
  if (!user) {
    return res.status(500).json({ message: "User not found by this Email" });
  }

  // set token on db
  let accessToken = JWT.sign(
    { _id: user._id, email: user.email },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
  accessToken = accessToken.replace(/\./g, "");
  const updatebytoken = await User.findByIdAndUpdate(user._id, {
    token: accessToken,
  });

  if (!updatebytoken) {
    return res.status(500).json({ message: "Something was wrong try again" });
  }

  sendEmail(
    req.body.email,
    "Reset Passwrod",
    resetpasswordtemplate(user.username, process.env.CLIENT_PORT, accessToken)
  );

  res.status(200).json({
    message:
      "Sended an link on your email " + req.body.email.slice(0, 6) + "***",
  });
});

/// verfiy reset password contorller
export const UserResetPasswordverify = asynchandler(async (req, res) => {
  const user = await User.findOne({ token: req.body.token });

  // // check exits email
  if (!user) {
    return res.status(500).json({ message: "Bad request Try agein" });
  }
  const hash = await bcrypt.hash(req.body.password, 10);

  const updatedDocument = await User.findOneAndUpdate(
    { token: req.body.token }, // The query to find the document
    { password: hash, token: "" }, // The new data to update the document with
    { new: true } // Set {new: true} to return the updated document instead of the original one
  );

  if (!updatedDocument) {
    return res.status(500).json({ message: "Something was wrong try again" });
  }

  res.status(200).json({
    message: "password update successfully",
  });
});

// get all users

export const Getalluser = asynchandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});
