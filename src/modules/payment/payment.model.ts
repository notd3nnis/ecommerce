import { model, Document, Schema } from "mongoose";
import { IPaymentType } from "../../types/IPayment";

const paymentSchema = new Schema<IPaymentType>({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    provider: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    transactionId: { type: String, required: true },
    paidAt: { type: Date, required: true },
}, {
    timestamps: true,
});

export const Payment = model<IPaymentType>("Payment", paymentSchema)