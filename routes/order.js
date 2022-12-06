import express from "express";
import {
  getAdminOrders,
  getMyOrderDetails,
  getMyOrders,
  paymentVerification,
  placeOrder,
  placeOrderOnline,
  processOrder,
} from "../controller/order.js";
import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/createorder",isAuthenticated, placeOrder);

router.post("/createorderonline",isAuthenticated, placeOrderOnline);

router.post("/paymentverification",isAuthenticated, paymentVerification)

router.get("/myorders", isAuthenticated, getMyOrders);
router.get("/order/:id", isAuthenticated, getMyOrderDetails);

//Admin middleware
router.get("/admin/orders", isAuthenticated,authorizedAdmin, getAdminOrders);

router.get("/admin/order/:id", isAuthenticated, authorizedAdmin, processOrder);

export default router;
