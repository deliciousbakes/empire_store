/** @format */


export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  userId: string ;
};

export type ProductProps = {
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  userId: string;
  costPrice:number;
  sellingPrice:number;
};

export type EmployeeProps = {
  emplPhone: number;
  emplImageUrl: string;
  name: string;
  userId: string;
};


export type LoginProps = {
  email: string;
  password: string;
};

export type UserProps = {
  email: string;
  image: string;
  firstName?: string;
  lastName?: string;
  // password: string;
  // phone: number;
};
