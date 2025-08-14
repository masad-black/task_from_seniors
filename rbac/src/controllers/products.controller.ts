import { Response, Request } from "express";

import { prisma } from "../db/prisma_connect.ts";
import ApiResponse from "../utils/api_response.ts";

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await prisma.products.findMany({});

    return res.json(new ApiResponse(200, null, products));
  } catch (error) {
    console.error("___error in getting products records___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function createNewProduct(req: Request, res: Response) {
  const { name, price, description, availableColors } = req.body;

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        price: Number.parseInt(price),
        description,
        availableColors: availableColors.split(","),
      },
    });

    return res.json(new ApiResponse(200, null, newProduct));
  } catch (error) {
    console.error("___error in creating new product record___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function deleteProduct(req: Request, res: Response) {
  const { productId } = req.params;

  try {
    await prisma.products.delete({
      where: {
        id: productId,
      },
    });
    return res.json(new ApiResponse(200, "product deleted", null));
  } catch (error) {
    console.error("___error in deleting product record___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

export { getAllProducts, createNewProduct, deleteProduct };
