"use server";

import db from "@/lib/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
export async function createUser(data: UserProps) {
  const { email, password, firstName, lastName, name, phone, image, role } =
    data;
  try {
    // Hash the PAASWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const phoneNumber = Number(phone);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        error: `User with this email(${email}) already exists`,
        status: 409,
        data: null,
      };
    }
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name,
        phone: phoneNumber,
        image,
        role,
      },
    });
    revalidatePath("/dashboard/users");
    console.log({ newUser });
    return {
      error: null,
      status: 200,
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something Went wrong, Please try again`,
      status: 500,
      data: null,
    };
  }
}

export async function getUsers() {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function createBulkUsers(users: UserProps[]) {
  try {
    for (const user of users) {
      await createUser(user);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUsers() {
  try {
    await db.user.deleteMany();
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
