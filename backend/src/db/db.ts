import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});

const contentType = ["tweet", "video", "link"];
const ContentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: contentType },
  data: { type: String },
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  tagId: { type: mongoose.Types.ObjectId, ref: "tags" },
});

const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

const TagSchema = new Schema({
  tag: { type: String },
});

export const userModel = model("users", UserSchema);
export const contentModel = model("content", ContentSchema);
export const linkModel = model("links", LinkSchema);
export const tagModel = model("tags", TagSchema);
