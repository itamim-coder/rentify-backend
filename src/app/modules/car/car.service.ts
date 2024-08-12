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

export const CarServices = {
  createCar,
};
