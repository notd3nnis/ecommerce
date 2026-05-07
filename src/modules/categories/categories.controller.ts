import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { ICategory } from "../../types/ICategory";
import { catchAsync } from "../../utils/catchAsync";
import { createCategory, getAllCategories, getCategoryById, editCategory, deleteCategory } from "./categories.service";


type CreateCategoryBody = Pick<ICategory, "name" | "description">;


// categories
export const newCategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const category = await createCategory(req.body as CreateCategoryBody);
    res.status(httpStatus.OK).json({
      status: true,
      message: "Category created successfully",
      data: category,
    });
  },
);

export const getCategories = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const categories = await getAllCategories({});
    res.status(httpStatus.OK).json({
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
    res.status(httpStatus.OK).json({
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
    res.status(httpStatus.OK).json({
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
    res.status(httpStatus.NO_CONTENT).json({
      status: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  },
);
