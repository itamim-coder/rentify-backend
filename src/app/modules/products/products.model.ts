import { Schema, model } from "mongoose";
import { TInventory, TProduct, TProductVariant } from "./products.interface";

const productVariantSchema = new Schema<TProductVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    tags: {
      type: [String],
    },
    variants: { type: [productVariantSchema] },
    inventory: { type: inventorySchema },
  },
  { timestamps: true }
);

export const Product = model<TProduct>("Products", productSchema);
