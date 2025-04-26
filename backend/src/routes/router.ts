import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { contentModel, linkModel, tagModel, userModel } from "../db/db";
import { AppError } from "../utils/AppError";
import auth from "../middleware/authMiddleware";
import { random } from "../utils/random";
import config from "../config/config";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { username, password, name } = req.body;

  const userSchema = z.object({
    username: z
      .string()
      .min(4)
      .max(25)
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "minimum of 6 characters needed!" })
      .max(20, { message: "should be atmost 20 characters!" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,20}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
    name: z.string({ message: "should be alphabets" }).optional(),
  });

  const validUser = userSchema.safeParse({
    username,
    password,
    name,
  });
  type User = z.infer<typeof userSchema>;

  if (validUser.success) {
    try {
      //type-checking
      const safeUser: User = { username, password, name };
      //hashing-password
      const hashed = await bcrypt.hash(safeUser.password, 10);
      //creating user in db
      const createdUser = await userModel.create({
        username: safeUser.username,
        password: hashed,
        name: safeUser.name,
      });
      //response
      if (createdUser) {
        res
          .status(200)
          .json({ success: true, msg: "user created", createdUser });
      } else {
        res.status(411).json({
          success: false,
          message: "unable to create user, try again!",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
});

router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;
  const userSchema = z
    .object({
      username: z
        .string()
        .min(4)
        .max(25)
        .email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "minimum of 6 characters needed!" })
        .max(20, { message: "should be atmost 20 characters!" })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,20}$/,
          {
            message:
              "Password must include uppercase, lowercase, number, and special character",
          }
        ),
    })
    .strict();
  const validUser = userSchema.safeParse({
    username,
    password,
  });
  type User = z.infer<typeof userSchema>;
  if (validUser.success) {
    const user: User = { username, password };
    try {
      const userMatch = await userModel.findOne({
        username: user.username,
      });
      if (userMatch) {
        const passwordMatch = await bcrypt.compare(
          user.password,
          userMatch.password
        );
        if (passwordMatch) {
          const _id = userMatch._id;
          const token = jwt.sign({ _id }, config.jwt_secret);
          res.status(200).json({ success: true, token });
        } else {
          throw new AppError("wrong password entered", 403, {});
        }
      } else {
        throw new AppError("user not found", 403, {});
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
});

router.post("/content", auth, async (req, res, next) => {
  const { title, link, data, type, tag } = req.body;
  const userId = req.userId;

  if (userId) {
    try {
      const createdTag = await tagModel.create({
        tag,
      });
      const content = await contentModel.create({
        title,
        link,
        data,
        type,
        userId,
        tagId: createdTag._id,
      });
      res.status(200).json({ success: true, content });
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("not authenticated to access", 401, {});
  }
});

router.get("/content", auth, async (req, res, next) => {
  const userId = req.userId;

  if (userId) {
    try {
      const content = await contentModel
        .find({ userId })
        .populate("userId", "username")
        .populate("tagId", "tag");
      if (content) {
        res.status(200).json({ success: true, content });
      } else {
        throw new AppError("no data found for user!", 204, {});
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("not authenticated to access", 401, {});
  }
});

router.delete("/content", auth, async (req, res, next) => {
  const userId = req.userId;
  const contentId = req.query.contentId;
  console.log(userId);

  const user = await userModel.findOne({ _id: userId });
  console.log(user);
  if (user) {
    try {
      const deletedContent = await contentModel.deleteOne({ _id: contentId });
      if (deletedContent) {
        res.status(200).json({ success: true, deletedContent });
      } else {
        throw new AppError("unable to delete data", 400, {});
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError(
      "You cannot delete, please verify before deleting!",
      401,
      {}
    );
  }
});

router.post("/content/sharebrain", auth, async (req, res, next) => {
  const userId = req.userId;
  const share = req.body.share;

  if (share) {
    if (userId) {
      try {
        const hashedLink = await linkModel.create({
          hash: random(10),
          userId,
        });
        res.status(200).json({ success: true, hashedLink: hashedLink.hash });
      } catch (error) {
        next(error);
      }
    } else {
      throw new AppError("token Invalid, please login again", 400, {});
    }
  } else {
    try {
      const deletedLink = await linkModel.deleteOne({ _id: userId });
      res.status(200).json({ success: true, deletedLink });
    } catch (error) {
      next(error);
    }
  }
});

router.get("/content/:shareLink", async (req, res, next) => {
  const shareLink = req.params.shareLink;

  console.log(shareLink);

  if (shareLink) {
    const user = await linkModel.findOne({ hash: shareLink });
    console.log(user);
    if (user) {
      try {
        const content = await contentModel
          .find({ userId: user.userId })
          .populate("userId", "username")
          .populate("tagId", "tag");
        res.status(200).json({
          success: true,
          content,
        });
      } catch (error) {
        next(error);
      }
    } else {
      throw new AppError("invalid Link shared!", 400, {});
    }
  }
});

export default router;
