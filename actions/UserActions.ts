"use server";

import db from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



export async function getUsers() {
  try {
    const users = await db.user.findMany();
    return users;
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

export const CheckUser = async () => {
  const loggedInUser = await currentUser();
  console.log({ loggedInUser });

  if (!loggedInUser) return null;

  const loggedInUserInDB = await db.user.findUnique({
    where: {
      clerkUserId: loggedInUser.id,
    },
  });

  if (loggedInUserInDB) return loggedInUserInDB;

  if (!loggedInUserInDB) {
    return await db.user.create({
      data: {
        clerkUserId: loggedInUser.id,
        image:loggedInUser.imageUrl,
        email: loggedInUser.emailAddresses[0].emailAddress,
        firstName:loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        role:"ADMIN"
      },
    });
  }
  return loggedInUserInDB;
};
import React from 'react'


export const GetUserFromDatabaseById = async () => {
  const currentDbUser= await currentUser();

  const loggedInUser = await db.user.findUnique({
    where: { clerkUserId: currentDbUser?.id },
  });
  return loggedInUser;
};