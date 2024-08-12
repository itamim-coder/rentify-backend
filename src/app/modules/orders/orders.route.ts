import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./orders.validation";
import { OrderControllers } from "./orders.controller";

const router = express.Router();

router.post(
  "",
  validateRequest(OrderValidation.orderValidationSchema),
  OrderControllers.createOrder
);



router.get("", OrderControllers.getAllOrders);

export const OrderRoutes = router;
