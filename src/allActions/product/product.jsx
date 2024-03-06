"use server";
import { queryProducts } from "@/libs/QueryProducts";

import connectToDB from "@/libs/connect";
import { ObjectId } from "mongodb";

const formateProduct = (products) => {
  const productArray = [];
  let i = 0;
  while (i < products.length) {
    let temp = [];
    let j = i;
    while (j < i + 4) {
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
    const db = await connectToDB();

    const Less500Product = await db
      .collection("products")
      .find({
        presentPrice: { $lt: 800 }, // Correct syntax for $lt
      })
      .sort({ sold_out: -1 })
      .limit(25)
      .toArray();

    const product = JSON.parse(JSON.stringify(Less500Product));
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const bestSelling = async () => {
  try {
    const db = await connectToDB();

    const LProduct = await db
      .collection("products")
      .find({})
      .sort({ sold_out: -1 })
      .limit(9)
      .toArray();
    const products = JSON.parse(JSON.stringify(LProduct));
    const product = formateProduct(products);
    return product;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const topSelling = async () => {
  try {
    const db = await connectToDB();

    const Less500Product = await db
      .collection("products")
      .find({})
      .sort({ sold_out: -1 })
      .limit(24)
      .toArray();
    const product = JSON.parse(JSON.stringify(Less500Product));
    return product;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
export const getproduct = async (id) => {
  try {
    const db = await connectToDB();

    const productobject = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    const seller = await db
      .collection("sellers")
      .findOne({ _id: new ObjectId(productobject.sellerId) });

    const product = JSON.parse(JSON.stringify(productobject));

    const sellerinfo = JSON.parse(JSON.stringify(seller));
    // Retrieve 10 products from the same seller
    const sellerProducts = await db
      .collection("products")
      .find({ sellerId: productobject.sellerId })
      .limit(10)
      .toArray();

    const sellerProductsInfo = JSON.parse(JSON.stringify(sellerProducts));

    return {
      product,
      sellerinfo,
      sellerProducts: sellerProductsInfo,
    };
  } catch (error) {
    return error.message;
  }
};

export const getRelatedProduct = async (id) => {
  try {
    const db = await connectToDB();
    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    const suggestProduct = await db
      .collection("products")
      .find({
        _id: { $ne: new ObjectId(id) },
        category: product.category,
      })
      .limit(20)
      .toArray();
    const relatedProducts = JSON.parse(JSON.stringify(suggestProduct));

    return relatedProducts;
  } catch (error) {
    return error.message;
  }
};

export const getMoreProduct = async (id) => {
  try {
    const db = await connectToDB();
    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    const moreProducts = await db
      .collection("products")
      .find({
        _id: { $ne: new ObjectId(product._id) }, // not equals to the given productId
        sellerId: product.sellerId,
      })
      .limit(20)
      .toArray();
    const products = JSON.parse(JSON.stringify(moreProducts));
    return products;
  } catch (error) {
    return error.message;
  }
};

// product.js
export const getAllproductsFeature = async (page, pageSize = 35) => {
  try {
    const db = await connectToDB();
    const products = await db
      .collection("products")
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    const product = JSON.parse(JSON.stringify(products));
    return product;
  } catch (e) {
    throw e;
  }
};

export const getbestElectronic = async () => {
  try {
    const db = await connectToDB();
    const under500ElectronicProducts = await db
      .collection("products")
      .find({
        $and: [
          // { presentPrice: { $lt: 500 } },
          {
            category: {
              $in: ["Kitchen", "Electronics Device", "Electronics Accessories"],
            },
          },
        ],
      })
      .sort({ sold_out: -1 })
      .limit(25)
      .toArray();

    const products = JSON.parse(JSON.stringify(under500ElectronicProducts));
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getToyProducts = async () => {
  try {
    const db = await connectToDB();
    const underProducts = await db
      .collection("products")
      .find({
        $and: [
          { presentPrice: { $lt: 800 } },
          {
            category: {
              $in: ["Kids & Toys"],
            },
          },
        ],
      })
      .sort({ sold_out: -1 })
      .limit(25)
      .toArray();
    const products = JSON.parse(JSON.stringify(underProducts));
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const ProductByQuery = async (query) => {
  try {
    const db = await connectToDB();

    const { query: mongodbQuery, sortOptions } = buildMongoDBQuery(query);

    const { page = 1, limit = 30 } = query;

    const totalProducts = await db
      .collection("products")
      .countDocuments(mongodbQuery);

    const products = await db
      .collection("products")
      .find(mongodbQuery)
      .sort(sortOptions) // Apply sorting options here
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalPages = Math.ceil(totalProducts / limit);

    return { products, totalProducts, totalPages, currentPage: page };
  } catch (error) {
    console.error(error);
  }
};

const buildMongoDBQuery = (query) => {
  const mongodbQuery = {};
  const sortOptions = {}; // Separate object for sorting

  if (query._c) mongodbQuery.category = query._c;
  if (query._subc) mongodbQuery.subCategory = query._subc;
  if (query._ch) mongodbQuery.childCategory = query._ch;
  if (query._lessThan)
    mongodbQuery.presentPrice = { $gt: parseInt(query._lessThan) };
  if (query._greaterThan)
    mongodbQuery.presentPrice = { $lt: parseInt(query._greaterThan) };
  if (query.rating) mongodbQuery.ratings = { $gt: parseInt(query.rating) };
  if (query.bestcold) mongodbQuery.bestcold = { $lt: parseInt(query.bestcold) };
  if (query._name) mongodbQuery.name = { $regex: query._name, $options: "i" };
  if (query._sortby) {
    if (query._sortby === "highToLow") {
      sortOptions.presentPrice = -1; // for descending order
    } else if (query._sortby === "lowToHigh") {
      sortOptions.presentPrice = 1; // for ascending order
    }
  }

  return { query: mongodbQuery, sortOptions };
};
