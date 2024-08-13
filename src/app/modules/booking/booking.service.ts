/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Car } from "../car/car.model";

import { TCar } from "../car/car.interface";
import { Booking } from "./booking.model";
import { calculateTotalCost } from "./booking.utils";
import QueryBuilder from "../../builder/QueryBuilder";

const createBooking = async (
  user: Types.ObjectId,
  bookingData: any
): Promise<TBooking | null> => {
  const userId = user;
  const carId = bookingData?.carId;

  console.log(userId);
  console.log(bookingData);
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
  }

  const UserData: TUser | null = await User.findById(userId);
  const CarData: TCar | null = await Car.findById(carId);

  // Check if the cow and buyer exist
  if (!UserData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (!CarData) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  // Check if the car is already unavailable
  if (CarData.status === "unavailable") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This car is unavailable right now"
    );
  }

  const session = await Car.startSession();
  session.startTransaction();
  let booking: TBooking | null = null;
  try {
    // Update the cow's label to 'sold out'
    CarData.status = "unavailable";
    await CarData.save({ session });

    // Create a new order entry
    booking = new Booking({ ...bookingData, userId: userId, carId: carId });
    await booking.save({ session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  const populatedBooking = await Booking.findById(booking?._id)
  .populate({
    path: "userId",
  })
  .populate({
    path: "carId",
  });
  return populatedBooking;
};

const getUserBookings = async (_id: string) => {
  const result = await Booking.find({ userId: _id })
    .populate({
      path: "userId",
    })
    .populate({
      path: "carId",
    });
  return result;
};

const returnCar = async (payload: any) => {
  const bookingId = payload.bookingId;
  const endTime = payload.endTime;
  const booking = await Booking.findById({ _id: bookingId })
    .populate("userId")
    .populate("carId");

  // Check if the cow and buyer exist
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  // Ensure car is populated and has the correct type
  if (!("pricePerHour" in booking.carId)) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }
  // Check if the car is already unavailable

  const session = await Booking.startSession();
  session.startTransaction();
  // let booking: TBooking | null = null;
  try {
    if (booking.startTime && endTime) {
      const totalCost = calculateTotalCost(
        booking.startTime,
        payload.endTime,
        booking.carId.pricePerHour
      );
      console.log(totalCost);
      booking.totalCost = totalCost;
      booking.endTime = endTime;
    }

    // booking.car.status = "available";
    await booking.save({ session });

    // Create a new order entry
    await Car.findByIdAndUpdate(
      { _id: booking.carId._id },
      { status: "available" },
      { session }
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  return booking;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const BookingQuery = new QueryBuilder(
    Booking.find().populate("userId").populate("carId"),
    query
  ).filter();

  const result = await BookingQuery.modelQuery;

  return result;
};

export const BookingServices = {
  createBooking,
  getUserBookings,
  returnCar,
  getAllBookings,
};
