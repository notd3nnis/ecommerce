import { Order } from "./order.model";
import { Product } from "../products/product.model";
import { Cart } from "../cart/cart.model";
import { ApiError } from "./../../utils/apiError";
import httpStatus from "http-status";
import {
  IOrderType,
  OrderItem,
  OrderStatus,
  PaymentStatus,
} from "../../types/IOrder";

import { IProduct } from "../../types/IProduct";

export const checkOut = async (orderBody: IOrderType, cartId: string) => {
  type getIproduct = Omit<IProduct, "createdAt" | "updatedAt">;
  const duplicateOrder = await Cart.findOne({ id: cartId });

  if (duplicateOrder) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "An order with this cart has already been processed",
    );
  }

  const cart = await Cart.findById({
    _id: cartId,
    userId: orderBody.userId,
  }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart is empty or not found");
  }

  const orderItems: OrderItem[] = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = (await Product.findById(
      item.productId as string,
    )) as getIproduct;

    if (!product) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `An item in your cart no longer exists.`,
      );
    }

    if (item.quantity > product.stock) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Insufficient stock for ${product.name}. Only ${product.stock} left in stock.`,
      );
    }

    orderItems.push({
      id: product._id.toString(),
      name: product.name,
      imageUrl: product.imageUrl,
      priceAtTimeOfOrder: product.price,
      quantity: item.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    totalAmount += product.price * item.quantity;
  }

  const newOrder = await Order.create({
    userId: orderBody.userId,
    items: orderItems,
    shoppingAddress: orderBody.shoppingAddress,
    paymentStatus: orderBody.paymentStatus,
    totalAmount,
    status: orderBody.status,
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });
  }

  cart.items = [];
  await cart.save();

  return newOrder;
};

export const getOrdersByUserId = async (userId: string) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  if (!orders) {
    throw new ApiError(httpStatus.NOT_FOUND, "No orders found for this user");
  }
  return orders;
};

export const getOrderById = async (orderId: IOrderType, userId: string) => {
  const order = await Order.findOne({ id: orderId, userId });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  return order;
};

export const getAllOrders = async () => {
  const orders = await Order.find().sort({ createdAt: -1 });

  if (!orders) {
    throw new ApiError(httpStatus.NOT_FOUND, "No orders found");
  }
  return orders;
};

// admin to do this
export const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  order.status = status as any;
  await order.save();

  return order;
};

// for this trigger a refund on the controller and update the payment status to refunded, then update the order status to cancelled
export const cancelOrder = async (orderId: IOrderType) => {
  let order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  if (["shipped", "delivered", "cancelled"].includes(order.status)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot cancel an order that is already ${order.status}.`,
    );
  }

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.id, {
      $inc: { stock: item.quantity },
    });
  }

  order.status = "cancelled" as OrderStatus;
  await order.save();

  return order;
};

export const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: string,
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  order.paymentStatus = paymentStatus as any; // change to enum
  await order.save();

  return order;
};
