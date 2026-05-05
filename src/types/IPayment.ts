import {Model, Document} from "mongoose";

export interface IPaymentType extends Document {
    orderId: String;
    userId: String;
    amount: number;
    provider: string;
    paymentStatus: "pending" | "completed" | "failed" | "refunded" | "reversed";
    transactionId: string;
    paidAt: Date;
    updatedAt: Date;
}

export interface IPaymentModel extends Model<IPaymentType> {
    
}