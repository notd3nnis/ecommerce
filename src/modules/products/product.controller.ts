import { Request, Response, NextFunction } from "express";
import { IProduct } from "../../types/IProduct";
import { ICategory } from "../../types/ICategory";
import { catchAsync } from "../../utils/catchAsync";
import {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
  createCategory,
  getAllCategories,
  getCategoryById,
  editCategory,
  deleteCategory,
} from "./product.service";

type CreateProductBody = Pick<
  IProduct,
  "name" | "description" | "price" | "category" | "stock" | "imageUrl" | "color"
>;
type CreateCategoryBody = Pick<ICategory, "name" | "description">;

export const createNewProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newProduct = await createProduct(req.body as CreateProductBody);
    res.status(201).json({
      status: true,
      message: "Product created successfully",
      data: newProduct,
    });
  },
);

export const getProducts = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const products = await getAllProducts({});
    res.status(200).json({
      status: true,
      message: "Products retrieved successfully",
      total: products.length,
      data: products,
    });
  },
);

export const getAProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await getProductById(req.params.id as string);
    res.status(200).json({
      status: true,
      message: "Product retrieved successfully",
      data: product,
    });
  },
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const updatedProduct = await editProduct(req.params.id as string, req.body);
    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  },
);

export const removeProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const deletedProduct = await deleteProduct(req.params.id as string, {
      isActive: false,
    });
    res.status(204).json({
      status: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  },
);

// categories

export const newCategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const category = await createCategory(req.body as CreateCategoryBody);
    res.status(201).json({
      status: true,
      message: "Category created successfully",
      data: category,
    });
  },
);

export const getCategories = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const categories = await getAllCategories({});
    res.status(200).json({
      status: true,
      message: "Categories retrieved successfully",
      total: categories.length,
      data: categories,
    });
  },
);

export const getACategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const category = await getCategoryById(req.params.id as string);
    res.status(200).json({
      status: true,
      message: "Category retrieved successfully",
      data: category,
    });
  },
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const updatedCategory = await editCategory(
      req.params.id as string,
      req.body,
    );
    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  },
);

export const removeCategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const deletedCategory = await deleteCategory(req.params.id as string, {
      isActive: false,
    });
    res.status(204).json({
      status: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  },
);
