import express from "express";

import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post("/confirmation", PaymentControllers.confirmationController);
router.post(
  "/create-payment/:id",

  //   auth(USER_ROLE.user),
  //   validateRequest(BookingValidation.createBookingValidationSchema),
  PaymentControllers.createPayment
);

export const PaymentRoutes = router;
