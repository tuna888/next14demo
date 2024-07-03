import { User } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDB();
    const user = await User.findById(id);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch the user");
  }
};
