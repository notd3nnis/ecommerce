import { Document, Schema, model } from "mongoose";
import { ICartType, ICartModel } from "../../types/ICart";

const cartSchema = new Schema<ICartType>({
    userId: { type: String, required: true },
    items: [
        {
            cartId: { type: String, required: true },
            productId: { type: String, required: true },
            priceAtTime: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
}, {
    timestamps: true,
});

export const Cart = model<ICartType, ICartModel>("Cart", cartSchema)
