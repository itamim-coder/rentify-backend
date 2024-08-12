import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import { TCar } from "../car/car.interface";

export interface TBooking {
  date: Date;
  user: Types.ObjectId | TUser; // Reference to the User model
  car: Types.ObjectId | TCar; // Reference to the Car model
  startTime: string; // 24hr format time as string (e.g., "14:00")
  endTime?: string; // 24hr format time as string (e.g., "16:00")
  totalCost?: number;
}
