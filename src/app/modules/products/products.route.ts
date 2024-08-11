import express from "express";

import { ProductControllers } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./products.validation";

const router = express.Router();

router.get("/:id", ProductControllers.getSingleProduct);
router.post(
  "",
  validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct
);

router.get("", ProductControllers.getAllProducts);
router.delete("/:id", ProductControllers.deleteProduct);

router.put(
  "/:id",

  ProductControllers.updateProduct
);

export const ProductRoutes = router;
