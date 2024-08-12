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

const createBooking = async (
  user: Types.ObjectId,
  bookingData: any
): Promise<TBooking | null> => {
  const userId = user;
  const carId = bookingData?.carId;
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

  // Check if the cow is already sold
  //   if (CowData.label === "sold out") {
  //     throw new ApiError(httpStatus.NOT_FOUND, "This cow is already sold");
  //   }

  const session = await Car.startSession();
  session.startTransaction();
  let booking: TBooking | null = null;
  try {
    // Update the cow's label to 'sold out'
    CarData.status = "unavailable";
    await CarData.save({ session });

    // Create a new order entry
    booking = new Booking({ ...bookingData, user: userId, car: carId });
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
      path: "user",
    })
    .populate({
      path: "car",
    });
  return populatedBooking;
};

export const BookingServices = {
  createBooking,
};
