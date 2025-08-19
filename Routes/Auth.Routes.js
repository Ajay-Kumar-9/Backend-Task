import { Router } from "express";
import { Login, Signup } from "../Controllers/Auth.Controllers.js";
import { validateUser } from "../Middlewares/Validate.User.js";
import { userSchema } from "../Validations/User.validation.js";

const router = Router();

router.post("/auth/signup", validateUser(userSchema), Signup); //singup Route
router.post("/auth/login", Login); //Login Route

export default router;
