import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be a positive number"),
    categoryId: z.string().min(1, "Category ID is required"),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    color: z.string().min(1, "Color is required"),
    imageUrl: z.string().url("Image URL must be a valid URL"),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    categoryId: z.string().min(1, "Category ID is required").optional(),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer").optional(),
    color: z.string().min(1, "Color is required").optional(),
    imageUrl: z.string().url("Image URL must be a valid URL").optional(),
  }),
}); 