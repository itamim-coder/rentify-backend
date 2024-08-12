import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import httpStatus from "http-status";
import { CarServices } from "./car.service";

const createCar = catchAsync(async (req, res) => {
  const carData = req.body;

  const result = await CarServices.createCar(carData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Car Created successfully",
    data: result,
  });
});

export const CarController = {
  createCar,
};
