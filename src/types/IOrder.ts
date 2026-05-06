import {Model, Document} from "mongoose";

export enum OrderStatus {
    PENDING = "pending",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

export enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded",
    REVERSED = "reversed"
}

export  interface OrderItem {
    id: String;
    name: String;
    imageUrl: String;
    priceAtTimeOfOrder: Number;
    quantity: Number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ShipmentAddress {
    id: String;
    name: String;
    phone: Number;
    street: String;
    city: String;
    postalCode: String;
    country: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderType extends Document {
    userId: String;
    items: OrderItem[];
    shoppingAddress: ShipmentAddress;
    paymentStatus: PaymentStatus;
    totalAmount: Number;
    status: OrderStatus;
    isActive: Boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface IOrderModel extends Model<IOrderType> {
    // You can add static methods here if needed
}