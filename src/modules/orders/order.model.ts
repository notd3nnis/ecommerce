import { Schema, model, Document } from 'mongoose';
import { IOrderType } from './../../types/IOrder';


const orderSchema = new Schema<IOrderType>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [Object], required: true }, 
    shoppingAddress: { type: [Object], required: true },
    paymentStatus: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});



export const Order = model<IOrderType>("Order", orderSchema)