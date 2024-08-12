import { z } from "zod";

const createCarZodSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z
      .enum(["available", "unavailable"])
      .optional()
      .default("available"),
    features: z.array(z.string()).optional().default([]),
    pricePerHour: z
      .number()
      .positive({ message: "Price per hour must be a positive number" }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const CarValidation = {
  createCarZodSchema,
};
