import User from "../models/User.js";
import asynchandler from "express-async-handler";

import bcrypt from "bcrypt";
import sendEmail, { temppasswordtemplate } from "../utils/sendemai.js";

// get all users

export const alluser = async (req, res, next) => {
  try {
    const users = await User.find().populate("role");

    res.json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

// create a user
export const crateuser = asynchandler(async (req, res) => {
  // get data
  const { username, email, password, role } = req.body;

  // check validation
  if (!username || !password || !email) {
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
    username,
    email,
    role,
    password: hash,
    status: true,
  });

  // check
  if (user) {
    sendEmail(
      req.body.email,
      "Access info",
      temppasswordtemplate(username, email, password)
    );

    return res.status(201).json({ message: "User created successful", user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// get all users

export const deleteuser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
