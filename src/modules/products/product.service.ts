import { Product } from "./product.model";
import { ApiError } from "../../utils/apiError";

export const createProduct = async (productData: Object) => {
  const newProduct = await Product.create(productData);

  if (!newProduct) {
    throw new ApiError(400, "Error creating product");
  }
  return newProduct;
};

export const getAllProducts = async (productData: Object) => {
  const products = await Product.find(productData);

  if (!products) {
    throw new ApiError(404, "Error fetching products");
  }
  return products;
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return product;
};

export const editProduct = async (id: string, updateData: Object) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedProduct) {
    throw new ApiError(400, "Error updating product");
  }
  return updatedProduct;
};

export const deleteProduct = async (id: string, deleteData: Object) => {
  const deletedProduct = await Product.findByIdAndUpdate(id, deleteData, {
    new: true,
  });

  if (!deletedProduct) {
    throw new ApiError(400, "Error deleting product");
  }
  return deletedProduct;
};