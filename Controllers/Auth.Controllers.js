import { signupService, loginService } from "../Services/Auth.Services.js";

// Signup Controller
export const Signup = async (req, res) => {
  try {
    const token = await signupService(req.body);

    res.status(201).json({
      message: "Signup successful",
      success: true,
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(400).json({ message: error.message, success: false });
  }
};

// Login Controller
export const Login = async (req, res) => {
  try {
    const token = await loginService(req.body);

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(400).json({ message: error.message, success: false });
  }
};
