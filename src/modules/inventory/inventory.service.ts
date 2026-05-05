import { Product } from "./product.model"
import { Category } from "./Categories.model";
import { ApiError } from "../../utils/ApiError";

export const createProduct = async (productData: Object) => {

        const newProduct = await Product.create(productData);

        if(!newProduct) {
            throw new ApiError(400, "Error creating product");
        }
        return newProduct;
}

export const getAllProducts = async (productData: Object) => {
    const products = await Product.find(productData);

    if(!products) {
        throw new ApiError(404, "Error fetching products");
    }
    return products;
}

export const getProductById = async (id: string) => {
    const product = await Product.findById(id);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }
    return product;
}

export const editProduct = async (id: string, updateData: Object) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if(!updatedProduct) {
        throw new ApiError(400, "Error updating product");
    }
    return updatedProduct;
}

export const deleteProduct = async (id: string, deleteData: Object) => {
    const deletedProduct = await Product.findByIdAndUpdate(id, deleteData, { new: true });

    if(!deletedProduct) {
        throw new ApiError(400, "Error deleting product");
    }
    return deletedProduct;
}


// Category crud..
export const createCategory = async (categoryData: Object) => {

    const newCategory = await Category.create(categoryData);

    if(!newCategory) {
        throw new ApiError(400, "Error creating category");
    }
    return newCategory;
}

export const getAllCategories = async (categoryData: Object) => {
    const categories = await Category.find(categoryData);

    if(!categories) {
        throw new ApiError(404, "Error fetching categories");
    }
    return categories;
}

export const getCategoryById = async (id: string) => {
    const category = await Category.findById(id);

    if(!category) {
        throw new ApiError(404, "Category not found");
    }
    return category;
}

export const editCategory = async (id: string, updateData: Object) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if(!updatedCategory) {
        throw new ApiError(400, "Error updating category");
    }
    return updatedCategory;
}

export const deleteCategory = async (id: string, deleteData: Object) => {
    const deletedCategory = await Category.findByIdAndUpdate(id, deleteData, { new: true });

    if(!deletedCategory) {
        throw new ApiError(400, "Error deleting category");
    }
    return deletedCategory;
}  