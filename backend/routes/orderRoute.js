import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderMobilepay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/mobilepay", authUser, placeOrderMobilepay);
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
