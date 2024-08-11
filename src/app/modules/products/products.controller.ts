import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { TProduct } from "./products.interface";
import { ProductServices } from "./products.service";
import { productFilterableFields } from "./products.constants";
import pick from "../../shared/pick";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  console.log(req.body);
  const result = await ProductServices.createProduct(productData);

  sendResponse<TProduct>(res, {
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const result = await ProductServices.getAllProducts(filters);
  if (!filters.searchTerm) {
    sendResponse<TProduct[]>(res, {
      success: true,
      message: "Products fetched successfully!",

      data: result,
    });
  } else {
    sendResponse<TProduct[]>(res, {
      success: true,
      message: `Products matching search term '${filters.searchTerm}' fetched successfully!"`,

      data: result,
    });
  }
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductServices.getSingleProduct(id);

  sendResponse<TProduct>(res, {
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ProductServices.updateProduct(id, updatedData);

  sendResponse<TProduct>(res, {
    success: true,
    message: "Product updated successfully !",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  await ProductServices.deleteProduct(id);

  sendResponse<TProduct>(res, {
    success: true,
    message: "Product deleted successfully !",
    data: null,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
