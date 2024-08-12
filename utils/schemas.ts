/** @format */

import * as z from "zod";
import { ZodSchema } from "zod";




export const UserSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(15, "First name must be at most 15 characters"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(15, "Last name must be at most 15 characters"),
  email: z
    .string()
    .email("Invalid email")
    .min(8, "Email must be at least 8 characters")
    .max(255, "Email must be at most 255 characters"),
  phone: z.string().max(20).optional().nullable(),
  address: z.string().max(255).optional(),
  zip: z
    .string()
    .optional()
    .refine((value: any) => /^[0-9]*$/.test(value), {
      message: "Zip code must be numeric",
    }),
});

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string().min(2, {
    message: "first name must be at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters",
  }),
  Name: z.string().min(2, {
    message: " Name is absent",
  }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters",
  }),
});

export function validateWithZodSchema<T, FormData>(
  schema: ZodSchema<T>,
  data: FormData
): T {
  const result = schema.safeParse(data);
  console.log(result);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export function formValidateWithZodSchema<T, FormData>(
  schema: ZodSchema<T>,
  data: FormData,
  prevState: any
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      ...prevState,
      zodErrors: result.error.flatten().fieldErrors,
      message: "Missisng fields Failed to register",
    };
  }
  return {
    ...prevState,
    data: result?.data,
  };
}

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  Title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: "guest amount must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: "bedrooms amount must be a positive number.",
  }),
  beds: z.coerce.number().int().min(0, {
    message: "beds amount must be a positive number.",
  }),
  baths: z.coerce.number().int().min(0, {
    message: "bahts amount must be a positive number.",
  }),
  amenities: z.string(),
});

export const PdtSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),
  costPrice: z.coerce.number().int().min(0, {
    message: "Cost price must be a positive number.",
  }),
  sellingPrice: z.coerce.number().int().min(0, {
    message: "Selling price must be a positive number.",
  }),
  category: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .max(100, {
      message: "Category must be less than 100 characters.",
    }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 5 && wordCount <= 15;
    },

    {
      message: "Description must be between 5 and 15 words.",
    }
  ),
});

export type PdtSchemaType = z.infer<typeof PdtSchema>;
export type UserSchemaType = z.infer<typeof UserSchema>;
export type CategorySchemaType = z.infer<typeof CategorySchema>;
// export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;
// export type PdtSchemaType = z.infer<typeof PdtSchema>;

// .refine(
//   (description) => {
//     const wordCount = description.split(" ").length;
//     return wordCount >= 10 && wordCount <= 1000;
//   },
//   {
//     message: "description must be between 10 and 1000 words.",
//   }
// );

export const  CategorySchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),

  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .max(100, {
      message: "Slug must be less than 100 characters.",
    }),

  imageUrl:z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .max(1000, {
      message: "Slug must be less than 1000 characters.",
    }),

  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },

    {
      message: "Description must be between 10 and 1000 words.",
    }
  ),
});

// export const  UserSchema = z.object({
//   title: z
//     .string()
//     .min(2, {
//       message: "Title must be at least 2 characters.",
//     })
//     .max(100, {
//       message: "Title must be less than 100 characters.",
//     }),

//   slug: z
//     .string()
//     .min(2, {
//       message: "Slug must be at least 2 characters.",
//     })
//     .max(100, {
//       message: "Slug must be less than 100 characters.",
//     }),

//   imageUrl:z
//     .string()
//     .min(2, {
//       message: "Slug must be at least 2 characters.",
//     })
//     .max(1000, {
//       message: "Slug must be less than 1000 characters.",
//     }),

//   description: z.string().refine(
//     (description) => {
//       const wordCount = description.split(" ").length;
//       return wordCount >= 10 && wordCount <= 1000;
//     },

//     {
//       message: "Description must be between 10 and 1000 words.",
//     }
//   ),
// });

export const ProductSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),

  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must be less than 100 characters.",
    }),
  costPrice: z.coerce.number().int().min(0, {
    message: "Cost price must be a positive number.",
  }),
  sellingPrice: z.coerce.number().int().min(0, {
    message: "Selling price must be a positive number.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),

  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },

    {
      message: "Description must be between 10 and 1000 words.",
    }
  ),
});

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 2048 * 2048;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 2 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
