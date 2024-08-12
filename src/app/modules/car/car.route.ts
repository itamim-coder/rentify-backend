import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidation } from "./car.validation";
import { CarController } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "",
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.createCarZodSchema),
  CarController.createCar
);

export const CarRoutes = router;
