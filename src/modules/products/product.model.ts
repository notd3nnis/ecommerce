import { Schema, model, Document } from 'mongoose';
import { IProduct } from '../../types/IProduct';
import { Category } from '../categories/categories.model';


const productSchema = new Schema<IProduct>({
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
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', //required: true 
    },
}, {
    timestamps: true,
});

productSchema.pre("save", async function (next) {
  if (this.isModified("categoryId")) {
    const categoryExists = await Category.findById(this.categoryId);
    
    if (!categoryExists) {
      throw new Error("Category not found");
    }
    
    if (!categoryExists.isActive) {
      throw new Error("Category is inactive");
    }
  }
});

export const Product = model<IProduct>("Product", productSchema)