/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BookingServices } from "./booking.service";
import { TBooking } from "./booking.interface";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: any, res) => {
  const { userId } = req.user;
  //   console.log("booking", req.user);
  const { ...bookingData } = req.body;
  const result = await BookingServices.createBooking(userId, bookingData);

  sendResponse<TBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully!",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: any, res) => {
  const { userId } = req.user;

  if (userId) {
    const result = await BookingServices.getUserBookings(userId);

    if (result.length > 0) {
      sendResponse<TBooking[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking fetched successfully for user !",

        data: result,
      });
    } else {
      sendResponse(res, {
        success: false,
        message: "Orders not found!",
      });
    }
  }
});

const returnCar = catchAsync(async (req, res) => {
  const returnData = req.body;
  console.log(req.body);
  const result = await BookingServices.returnCar(returnData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is return succesfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Bookings are retrieved successfully",

    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getUserBookings,
  returnCar,
  getAllBookings,
};
