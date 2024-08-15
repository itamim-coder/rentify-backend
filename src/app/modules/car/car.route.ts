import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidation } from "./car.validation";
import { CarController } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { BookingControllers } from "../booking/booking.controller";

const router = express.Router();

router.post(
  "",
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.createCarZodSchema),
  CarController.createCar
);

router.get(
  "",
  CarController.getAllCars
);

router.get(
  "/:id",
  CarController.getSingleCar
);

router.put(
  "/return",
  auth(USER_ROLE.admin),
  BookingControllers.returnCar
);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  CarController.updateCar
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  CarController.softDeleteCar
);

export const CarRoutes = router;
