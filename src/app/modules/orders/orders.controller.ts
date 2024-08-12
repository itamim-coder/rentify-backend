import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { OrderServices } from "./orders.service";
import { TOrders } from "./orders.interface";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  // console.log(req.body);
  const result = await OrderServices.createOrder(orderData);

  sendResponse<TOrders>(res, {
    success: true,
    message: "Orders created successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email;

  if (email) {
    const result = await OrderServices.getUserOrders(email);
    if (result.length > 0) {
      sendResponse<TOrders[]>(res, {
        success: true,
        message: "Orders fetched successfully for user email!",

        data: result,
      });
    } else {
      sendResponse(res, {
        success: false,
        message: "Orders not found!",
      });
    }
  } else {
    const result = await OrderServices.getAllOrders();

    sendResponse<TOrders[]>(res, {
      success: true,
      message: "Orders fetched successfully!",

      data: result,
    });
  }
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
