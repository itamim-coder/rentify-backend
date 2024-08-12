/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BookingServices } from "./booking.service";
import { TBooking } from "./booking.interface";

const createBooking = catchAsync(async (req: any, res) => {
  const { userId } = req.user;
  //   console.log("booking", req.user);
  const { ...bookingData } = req.body;
  const result = await BookingServices.createBooking(userId, bookingData);

  sendResponse<TBooking>(res, {
    success: true,
    message: "Booking created successfully!",
    data: result,
  });
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
