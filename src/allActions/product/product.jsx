"use server";
import { queryProducts } from "@/libs/QueryProducts";
import prisma from "../../../prisma/prisma";
import { Fragment } from "react";
import ProductCard from "@/componants/route/productCard/productCard";

const formateProduct = (products) => {
  const productArray = [];
  let i = 0;
  while (i < products.length) {
    let temp = [];
    let j = i;
    while (j < i + 3) {
      if (products[j]) {
        temp.push(products[j]);
      }
      j++;
    }
    productArray.push([...temp]);
    i = j;
  }
  return productArray;
};

export const getqueryProduct = async () => {
  try {
    const underProducts = await prisma.products.findMany({
      where: {
        OR: [
          {
            discountPrice: {
              lt: 500,
            },
          },
          {
            originalPrice: {
              lt: 500,
            },
          },
        ],
      },
      orderBy: {
        sold_out: "asc",
      },
      take: 25,
    });
    return underProducts;
  } catch (error) {
    console.log(error);
  }
};
export const getproduct = async (id) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    return product;
  } catch (error) {
    return error.message;
  }
};

export const getRelatedProduct = async (id) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    const relatedProducts = await prisma.products.findMany({
      where: {
        id: {
          not: {
            equals: product.id,
          },
        },
        category: {
          equals: product.category,
        },
      },
      take: 20,
    });

    return relatedProducts;
  } catch (error) {
    return error.message;
  }
};

export const getMoreProduct = async (id) => {
  try {
    const moreProducts = await prisma.products.findMany({
      where: {
        id: {
          not: {
            equals: product.id,
          },
        },
        sellerId: {
          equals: product.sellerId,
        },
      },
      take: 20,
    });

    return moreProducts;
  } catch (error) {
    return error.message;
  }
};

export const getAllProducts = async (query) => {
  try {
    const query = {};
    // for (const [key, value] of searchParams.entries()) {
    //   query[key] = value;
    // }

    const pageNumber = parseInt(query.pageNumber) || 1;
    const parPage = parseInt(query.parPage) || 25;

    const products = await prisma.products.findMany({
      take: parPage,
      skip: (pageNumber - 1) * parPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = new queryProducts(products, query)
      .categoryQuery()
      .subCategoryQuery()
      .ratingQuery()
      .priceQuery()
      .highPriceQuery()
      .searchQuery()
      // .sortByPrice()
      .skip()
      .limit()
      .getProducts();
    const totalproduct = new queryProducts(products, query)
      .categoryQuery()
      .subCategoryQuery()
      .ratingQuery()
      .priceQuery()
      .highPriceQuery()
      .searchQuery()
      // .sortByPrice()
      .countProducts();

    return {
      result,
      totalproduct,
    };
  } catch (e) {
    return e.message;
  }
};

export const getAllproductsFeature = async (page) => {
  try {
    const products = await prisma.products.findMany({
      take: 3,
      skip: (page - 1) * 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return products.map((products, index) => (
      <Fragment key={index}>
        <ProductCard data={products} i={index} />
      </Fragment>
    ));
  } catch (e) {
    return e.message;
  }
};

export const getbestElectronic = async () => {
  try {
    const underProducts = await prisma.products.findMany({
      where: {
        OR: [
          {
            discountPrice: {
              lt: 500,
            },
          },
          {
            originalPrice: {
              lt: 500,
            },
          },
        ],
      },
      orderBy: {
        sold_out: "asc",
      },
      take: 25,
    });
    return underProducts;
  } catch (error) {
    console.log(error);
  }
};

export const getToyProducts = async () => {
  try {
    const underProducts = await prisma.products.findMany({
      where: {
        OR: [
          {
            discountPrice: {
              lt: 500,
            },
          },
          {
            originalPrice: {
              lt: 500,
            },
          },
        ],
      },
      orderBy: {
        sold_out: "asc",
      },
      take: 25,
    });
    return underProducts;
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (data) => {
  console.log(data);
};
