import { Schema, model, Document } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    color: { type: String, required: true },
    imageUrl: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    reviewCount: {type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    // categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
}, {
    timestamps: true,
});

export const Product = model("Product", productSchema)