import { Product } from "../products/products.model";
import { TOrders } from "./orders.interface";
import { Order } from "./orders.model";

const createOrder = async (order: TOrders): Promise<TOrders | null> => {
  //   const createdOrder: TOrders | null = null;
  const { productId, quantity, email, price } = order;
  console.log(productId);
  try {
    const product = await Product.findById({ _id: productId });
    console.log(product);
    if (!product) {
      throw new Error("Product not found");
    }
    const availableQuantity = product.inventory.quantity;

    // Check if enough inventory is available
    if (quantity > availableQuantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Update inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save updated product inventory
    await product.save();

    // Create new order
    const createdOrder = new Order({
      email,
      productId,
      price,
      quantity,
    });
    await createdOrder.save();

  
    return createdOrder.toObject() as TOrders;


 
  } catch (err) {
    throw new Error("Failed to create Order");
  }
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};
const getUserOrders = async (email: unknown): Promise<TOrders[]> => {
  if (!email) {
    throw new Error("Order not found");
  }
  const result = await Order.find({ email });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getUserOrders,
};
