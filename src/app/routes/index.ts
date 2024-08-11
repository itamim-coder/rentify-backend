import express from "express";

import { ProductRoutes } from "../modules/products/products.route";
import { OrderRoutes } from "../modules/orders/orders.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
