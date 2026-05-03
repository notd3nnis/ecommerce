import {Request, Response} from "express";
import {Product} from "../model/Product";
import { Category } from "../model/Categories";
import { createProduct, getAllProducts, getProductById, editProduct, deleteProduct } from "../service/inventoryService";
import { createCategory, getAllCategories, getCategoryById, editCategory, deleteCategory } from "../service/inventoryService";

// to be removed later, just to test if the route is working fine.
export const checkProduct = async (req:Request, res: Response) => {
    console.log("Checking product route");
    try {
        const products = await Product.find();
        res.status(200).json({
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        console.error("Error checking product route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNewProduct = async (req: Request, res: Response) => {
    try {
        interface ProductData {
            name: string,
            description: string,
            price: number,
            category: string,
            stock: number,
            imageUrl: string,
            color: string,
            // categoryId: string
        }
        const newProduct = await createProduct(req.body as ProductData);
        res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts({});
        res.status(200).json({
            message: "Products retrieved successfully",
            total: products.length,
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAProduct = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(req.params.id as string);
        res.status(200).json({
            message: "Product retrieved successfully",
            data: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await editProduct(req.params.id as string, req.body);
        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id as string  , { isActive: false });
        res.status(204).json({
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// categories crud

export const newCategory = async (req: Request, res: Response) => {
    try {
        interface CategoryData {
            name: string,
            description: string,
        }

        const newCategory = await createCategory(req.body as CategoryData);
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories({});
        res.status(200).json({
            message: "Categories retrieved successfully",
            total: categories.length,
            data: categories
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getACategory = async (req: Request, res: Response) => {
    try {
        const category = await getCategoryById(req.params.id as string);
        res.status(200).json({
            message: "Category retrieved successfully",
            data: category
        })
    } catch(error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const updatedCategory = await editCategory(req.params.id as string, req.body);
        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeCategory = async (req: Request, res: Response) => {
    try {
        const deletedCategory = await deleteCategory(req.params.id as string  , { isActive: false });
        res.status(204).json({
            message: "Category deleted successfully",
            data: deletedCategory
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}