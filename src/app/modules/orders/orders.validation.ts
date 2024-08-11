import { z } from "zod";

const orderValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number(),
  }),
});

export const OrderValidation = {
  orderValidationSchema,
};
