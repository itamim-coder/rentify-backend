/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import httpStatus from "http-status";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PaymentService.createPayment(id);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment create successfully !",
    data: result,
  });
});

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;

  const result = await PaymentService.confirmationService(
    transactionId as string,
    status as string
  );
  res.send(result);
});

export const PaymentControllers = {
  createPayment,
  confirmationController,
};
