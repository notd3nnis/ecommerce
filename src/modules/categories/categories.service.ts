import { ApiError } from "../../utils/apiError";
import { Category } from "../categories/categories.model";

// Category crud..
export const createCategory = async (categoryData: Object) => {
  const newCategory = await Category.create(categoryData);

  if (!newCategory) {
    throw new ApiError(400, "Error creating category");
  }
  return newCategory;
};

export const getAllCategories = async (categoryData: Object) => {
  const categories = await Category.find(categoryData).select("_id name").lean();

  if (!categories) {
    throw new ApiError(404, "Error fetching categories");
  }
  return categories;
};

export const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return category;
};

export const editCategory = async (id: string, updateData: Object) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedCategory) {
    throw new ApiError(400, "Error updating category");
  }
  return updatedCategory;
};

export const deleteCategory = async (id: string, deleteData: Object) => {
  const deletedCategory = await Category.findByIdAndUpdate(id, deleteData, {
    new: true,
  });

  if (!deletedCategory) {
    throw new ApiError(400, "Error deleting category");
  }
  return deletedCategory;
};
