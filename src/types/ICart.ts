import { Model, Document } from "mongoose";

export interface CartItem {
    cartId: string;
    productId: string;
    priceAtTime: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICartType extends Document {
    userId: string;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICartModel extends Model<ICartType> {
    // Static methods will be added here if needed
}