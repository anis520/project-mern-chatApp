import Role from "../models/Role.js";
import bcrypt from "bcrypt";
import asynchandler from "express-async-handler";
import { CreateSlug } from "../helpers/createSlug.js";

// create a permiton
export const roleController = asynchandler(async (req, res) => {
  // get data
  const { name, permissions } = req.body;
  console.log(permissions);
  let slug = CreateSlug(name);
  // check
  const namecheck = await Role.findOne({ name });

  if (namecheck) {
    return res.status(500).json({ message: "Role already Exits" });
  }
  // create new user data
  const role = await Role.create({
    name,
    slug,
    permissions,
  });

  if (role) {
    return res.status(201).json({ message: "Role created successful", role });
  } else {
    return res.status(400).json({ message: "Invalid role data" });
  }
});

// get all user
export const allroleController = asynchandler(async (req, res) => {
  // create new user data
  const role = await Role.find();

  // check
  if (role) {
    return res.status(201).json({ message: "roles get successful", role });
  } else {
    return res.status(400).json({ message: "Invalid role data" });
  }
});

export const singleroleAndDeleteController = asynchandler(async (req, res) => {
  const { id } = req.params;

  // create new user data
  const role = await Role.findByIdAndDelete(id);

  // check
  if (role) {
    return res.status(201).json({ message: "Delete single role", role });
  } else {
    return res.status(400).json({ message: "Invalid role data" });
  }
});

// update role
export const singleroleUpdateController = asynchandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  // create new user data
  const role = await Role.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      permissions: req.body.permitions,
    },
    { new: true }
  );

  // check
  if (role) {
    return res.status(201).json({ message: "get single role", role });
  } else {
    return res.status(400).json({ message: "Invalid role data" });
  }
});

// update role status
export const roleStatusUpdate = asynchandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  // create new user data
  const role = await Role.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  // check
  if (role) {
    return res.status(201).json({ message: "get single role", role });
  } else {
    return res.status(400).json({ message: "Invalid role data" });
  }
});
