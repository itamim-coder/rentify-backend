/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { Booking } from "../booking/booking.model";
import { TUser } from "../user/user.interface";
import AppError from "../../errors/AppError";
import { TBooking } from "../booking/booking.interface";
import { initiatePayment, verifyPayment } from "./payment.utils";
import { join } from "path";
import { readFileSync } from "fs";
// import { generateTransactionId } from "../booking/booking.utils";

const createPayment = async (_id: string) => {
  const BookingData: TBooking | null = await Booking.findById({ _id })
    .populate("user")
    .populate("car");
  console.log(BookingData);
  if (!BookingData) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  const user = BookingData.user as TUser;
  if (BookingData.bookingStatus === "Cancelled") {
    throw new AppError(httpStatus.NOT_FOUND, "Booking is Cancelled");
  }
//   const transactionId = generateTransactionId();
  try {
    const paymentData = {
      transactionId: BookingData.transactionId,
      totalCost: BookingData.totalCost,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      customerAddress: user.address,
    };
    console.log(paymentData);
    const paymentSession = await initiatePayment(paymentData);

    return paymentSession;
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line no-unused-vars
const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
//   console.log(verifyResponse);

  let result;
  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
        transactionId: transactionId,
      }
    );
    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "../../../views/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  return template;
};

export const PaymentService = {
  createPayment,
  confirmationService,
};
