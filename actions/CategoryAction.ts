/** @format */

"use server";
 
import db from "@/lib/db";
import { CategoryProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createBulkCategories(categories: CategoryProps[]) {
  try {
    for (const category of categories) {
      await createCategory(category);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
  }
}



export async function updateCategoryById(id: string, data: CategoryProps) {
  try {
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/inventory/categories");
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
}


export async function deleteCategoryById(id: string) {
  try {
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
    });
 
    return {
      ok: true,
      data: deletedCategory,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteManyCategories() {
  try {
    await db.category.deleteMany();
 
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
  }
}




export async function createCategory(data: CategoryProps) {
  const slug = data.slug;
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (existingCategory) {
      return existingCategory;
    }
    const newCategory = await db.category.create({
      data,
    });
    // console.log(newCategory);
    revalidatePath("/dashboard/categories");
    return newCategory;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAllCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      
    });
 
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}