import { productSearchableFields } from "./products.constants";
import { TProduct, TProductFilterRequest } from "./products.interface";
import { Product } from "./products.model";

const createProduct = async (product: TProduct): Promise<TProduct | null> => {
  let createdProduct: TProduct | null = null;

  try {
    createdProduct = await Product.create(product);

    return createdProduct;
  } catch (err) {
    throw new Error("Failed to create Product");
  }
};

const getAllProducts = async (filters: TProductFilterRequest) => {
  const { searchTerm, ...filterData } = filters;
  console.log(filters);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i", // Case-insensitive
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  console.log("Where Conditions:", JSON.stringify(whereConditions, null, 2));
  const result = await Product.find(whereConditions);
  return result;
};

const getSingleProduct = async (_id: string): Promise<TProduct | null> => {
  const result = await Product.findOne({ _id });

  return result;
};

const updateProduct = async (
  _id: string,
  payload: Partial<TProduct>
): Promise<TProduct | null> => {
  const isExist = await Product.findOne({ _id });

  if (!isExist) {
    throw new Error("Product not found !");
  }

  const { ...ProductData } = payload;

  const updatedProductData: Partial<TProduct> = { ...ProductData };

  const result = await Product.findOneAndUpdate({ _id }, updatedProductData, {
    new: true,
  });
  return result;
};

const deleteProduct = async (_id: string): Promise<TProduct | null> => {
  const result = await Product.findByIdAndDelete(_id);

  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
