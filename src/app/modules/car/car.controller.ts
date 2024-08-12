import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import httpStatus from "http-status";
import { CarServices } from "./car.service";
import { TCar } from "./car.interface";

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

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCars();

  sendResponse<TCar[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully !",

    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await CarServices.getSingleCar(id);

  sendResponse<TCar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Car retrieved successfully !",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CarServices.updateCar(id, updatedData);

  sendResponse<TCar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully !",
    data: result,
  });
});

const softDeleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.softDeleteCar(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is deleted succesfully",
    data: result,
  });
});

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  softDeleteCar,
};
