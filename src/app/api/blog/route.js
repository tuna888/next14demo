import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDB();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

// RESTFUL API
export const DELETE = async (id) => {
  try {
    connectToDB();
    await Post.findByIdAndDelete(id);
    console.log("post was deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post");
  }
};
