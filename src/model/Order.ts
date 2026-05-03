import { Schema, model, Document } from 'mongoose';

interface ItemObject {
    id: String;
    name: String;
    imageUrl: String;
    priceAtTimeOfOrder: Number;
    quantity: Number;
    createdAt: Date;
    updatedAt: Date;
}

const itemSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    priceAtTimeOfOrder: { type: Number, required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const shoppingCartSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [itemSchema], 
    shoppingAddress: { type: shoppingCartSchema, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded', 'reversed'], default: 'pending' },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export const Order = model("Order", orderSchema)