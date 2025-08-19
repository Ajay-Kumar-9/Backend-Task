import { UserModel } from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


//Signup Service

export const signupService = async ({ name, email, password, role }) => {
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "12hr" }
  );

  return token;
};


//Login Service

export const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "12hr" }
  );

  return token;
};
