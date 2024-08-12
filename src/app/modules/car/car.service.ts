import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCar = async (car: TCar): Promise<TCar | null> => {
  const createdCar = await Car.create(car);

  if (!createdCar) {
    throw new AppError(400, "Failed to create user!");
  }

  return createdCar;
};

const getAllCars = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCar = async (_id: string): Promise<TCar | null> => {
  const result = await Car.findById({ _id });

  return result;
};

const updateCar = async (
  _id: string,

  payload: Partial<TCar>
): Promise<TCar | null> => {
  const isExist = await Car.findById({ _id });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found !");
  }

  const { ...CarData } = payload;

  const updatedCarData: Partial<TCar> = { ...CarData };

  const result = await Car.findOneAndUpdate({ _id }, updatedCarData, {
    new: true,
  });
  return result;
};
const softDeleteCar = async (_id: string): Promise<TCar | null> => {
  const isExist = await Car.findById({ _id });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found !");
  }

  const result = await Car.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const CarServices = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  softDeleteCar,
};
