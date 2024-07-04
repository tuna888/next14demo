import { User } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";
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

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDB();
    const res = await User.findByIdAndDelete(id);
    revalidatePath("/admin");
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find the user");
  }
};
