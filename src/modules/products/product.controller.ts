import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { IProduct } from "../../types/IProduct";
import { catchAsync } from "../../utils/catchAsync";
import {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct
} from "./product.service";

type CreateProductBody = Pick<
  IProduct,
  "name" | "description" | "price" | "categoryId" | "stock" | "imageUrl" | "color"
>;


export const createNewProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newProduct = await createProduct(req.body as CreateProductBody);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: "Product created successfully",
      data: newProduct,
    });
  },
);

export const getProducts = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const products = await getAllProducts({});
    res.status(httpStatus.OK).json({
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
    res.status(httpStatus.OK).json({
      status: true,
      message: "Product retrieved successfully",
      data: product,
    });
  },
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const updatedProduct = await editProduct(req.params.id as string, req.body);
    res.status(httpStatus.OK).json({
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
    res.status(httpStatus.NO_CONTENT).json({
      status: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  },
);
