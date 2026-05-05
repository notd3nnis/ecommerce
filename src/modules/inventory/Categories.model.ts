import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
}, {
    timestamps: true,
});

export const Category = model("Category", categorySchema)