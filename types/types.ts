/** @format */

import { UserRole } from "@prisma/client";

export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};

export type EmployeeProps = {
  emplPhone: number;
  emplImageUrl: string;
  name: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type UserProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  name: string;
  image: string;
  phone: number;
  role: UserRole;
};
