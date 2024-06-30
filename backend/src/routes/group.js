import { Router } from "express";
const groupRouter = Router();

import { getAllUsers } from "../controller/userController.js";

groupRouter.get('/', getAllUsers)

export default groupRouter