import { User } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};
