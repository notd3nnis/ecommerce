import { Model, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    categoryId: String;
    stock: number;
    color: string;
    imageUrl: string;
    averageRating: number;
    reviewCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductModel extends Model<IProduct> {
    // You can add static methods here if needed
}