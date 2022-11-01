import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import { generateToken } from "../Utils/utils.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //bcrypt.compareSync
      if ((req.body.password, user.password)) {
        res.send({
          _id: user,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid credentials" });
  })
);

export default userRouter;
