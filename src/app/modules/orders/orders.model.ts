import { Schema, model } from "mongoose";
import { TOrders } from "./orders.interface";

const OrderSchema = new Schema<TOrders>(
  {
    email: {
      type: String,
      required: [true, "Name is required"],
    },
    productId: {
      type: String,
      required: [true, "Product Id is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
  },

  {
    toJSON: {
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Order = model<TOrders>("Orders", OrderSchema);
