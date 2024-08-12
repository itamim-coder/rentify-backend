import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createBooking = catchAsync(async (req: any, res) => {
  //   const { ...bookingData } = req.body;
  console.log("booking", req?.user);
  //   const result = await OrderServices.createOrder(orderData);

  //   sendResponse<TOrders>(res, {
  //     success: true,
  //     message: "Orders created successfully!",
  //     data: result,
  //   });
});

// const getAllOrders = catchAsync(async (req: Request, res: Response) => {
//   const email = req.query.email;

//   if (email) {
//     const result = await OrderServices.getUserOrders(email);
//     if (result.length > 0) {
//       sendResponse<TOrders[]>(res, {
//         success: true,
//         message: "Orders fetched successfully for user email!",

//         data: result,
//       });
//     } else {
//       sendResponse(res, {
//         success: false,
//         message: "Orders not found!",
//       });
//     }
//   } else {
//     const result = await OrderServices.getAllOrders();

//     sendResponse<TOrders[]>(res, {
//       success: true,
//       message: "Orders fetched successfully!",

//       data: result,
//     });
//   }
// });

export const BookingControllers = {
  createBooking,
};
