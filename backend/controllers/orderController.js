import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStrip = async (req, res) => {};

const placeOrderMobilepay = async (req, res) => {};

const allOrders = async (req, res) => {};

const userOrders = async (req, res) => {
  try {

  } catch (error) {

  }
};

const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStrip,
  placeOrderMobilepay,
  allOrders,
  userOrders,
  updateStatus,
};
