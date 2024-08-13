/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import { TCar } from "../car/car.interface";

export interface TBooking {
  save(arg0: { session: import("mongodb").ClientSession }): unknown;
  _id: Types.ObjectId;
  date: Date;
  userId: Types.ObjectId | TUser; // Reference to the User model
  carId: Types.ObjectId | TCar; // Reference to the Car model
  startTime: string; // 24hr format time as string (e.g., "14:00")
  endTime?: string; // 24hr format time as string (e.g., "16:00")
  totalCost?: number;
}
