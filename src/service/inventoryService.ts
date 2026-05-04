import { Product } from "../model/Product"
import { Category } from "../model/Categories";
import { AppError } from "../utils/EAppErrorsd";

export const createProduct = async (productData: Object) => {

        const newProduct = await Product.create(productData);

        if(!newProduct) {
            throw new AppError("Error creating product", 400);
        }
        return newProduct;
}

export const getAllProducts = async (productData: Object) => {
    const products = await Product.find(productData);

    if(!products) {
        throw new AppError("Error fetching products", 404);
    }
    return products;
}

export const getProductById = async (id: string) => {
    const product = await Product.findById(id);

    if(!product) {
        throw new AppError("Product not found", 404);
    }
    return product;
}

export const editProduct = async (id: string, updateData: Object) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if(!updatedProduct) {
        throw new AppError("Error updating product", 400);
    }
    return updatedProduct;
}

export const deleteProduct = async (id: string, deleteData: Object) => {
    const deletedProduct = await Product.findByIdAndUpdate(id, deleteData, { new: true });

    if(!deletedProduct) {
        throw new AppError("Error deleting product", 400);
    }
    return deletedProduct;
}


// Category crud..
export const createCategory = async (categoryData: Object) => {

    const newCategory = await Category.create(categoryData);

    if(!newCategory) {
        throw new AppError("Error creating category", 400);
    }
    return newCategory;
}

export const getAllCategories = async (categoryData: Object) => {
    const categories = await Category.find(categoryData);

    if(!categories) {
        throw new AppError("Error fetching categories", 404);
    }
    return categories;
}

export const getCategoryById = async (id: string) => {
    const category = await Category.findById(id);

    if(!category) {
        throw new AppError("Category not found", 404);
    }
    return category;
}

export const editCategory = async (id: string, updateData: Object) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if(!updatedCategory) {
        throw new AppError("Error updating category",   400);
    }
    return updatedCategory;
}

export const deleteCategory = async (id: string, deleteData: Object) => {
    const deletedCategory = await Category.findByIdAndUpdate(id, deleteData, { new: true });

    if(!deletedCategory) {
        throw new AppError("Error deleting category", 400);
    }
    return deletedCategory;
}  