import { asyncError } from "../middleware/errorMiddlerware.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";

export const myProfle = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("connect.sid", {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    });
    res.status(200).json({
      message: "Logged out",
    });
  });
};

export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    sucess: true,
    users,
  });
});

export const getAdminStats = asyncError(async (req, res, next) => {
  const usersCount = await User.countDocuments();

  const orders = await Order.find({});

  const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
  const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

  const totalIncome = orders.reduce(
    (totalAmount, current) => (totalAmount += current.totalAmount),
    0
  );

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length,
      preparing: preparingOrders.length,
      shipped: shippedOrders.length,
      delivered: deliveredOrders.length,
    },
    totalIncome,
  });
});
