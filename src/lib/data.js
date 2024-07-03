// 不使用API，直接从数据库中获取数据，不再使用
import { connectToDB } from "./utils";
import { User, Post } from "./models";
import { unstable_noStore } from "next/cache";

export const getPosts = async () => {
  try {
    connectToDB();
    const posts = await Post.find();
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    connectToDB();
    const post = await Post.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch the post!");
  }
};

export const getUser = async (id) => {
  unstable_noStore();
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch the user!");
  }
};
