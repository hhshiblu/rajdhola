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
    const db = await connectToDB();

    const Less500Product = await db
      .collection("products")
      .find({
        $or: [{ discountPrice: { $lt: 500 } }, { originalPrice: { $lt: 500 } }],
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
export const topSelling = async () => {
  try {
    const db = await connectToDB();

    const Less500Product = await db
      .collection("products")
      .find({})
      .sort({ sold_out: -1 })
      .limit(25)
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
      .collection("seller")
      .findOne({ sellerId: productobject.sellerId });
    const product = JSON.parse(JSON.stringify(productobject));
    const sellerinfo = JSON.parse(JSON.stringify(seller));

    return {
      product,
      sellerinfo,
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

// export const getAllProducts = async (query) => {
//   try {
//     const query = {};
//     // for (const [key, value] of searchParams.entries()) {
//     //   query[key] = value;
//     // }

//     const pageNumber = parseInt(query.pageNumber) || 1;
//     const parPage = parseInt(query.parPage) || 25;

//     const products = await prisma.products.findMany({
//       take: parPage,
//       skip: (pageNumber - 1) * parPage,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     const result = new queryProducts(products, query)
//       .categoryQuery()
//       .subCategoryQuery()
//       .ratingQuery()
//       .priceQuery()
//       .highPriceQuery()
//       .searchQuery()
//       // .sortByPrice()
//       .skip()
//       .limit()
//       .getProducts();
//     const totalproduct = new queryProducts(products, query)
//       .categoryQuery()
//       .subCategoryQuery()
//       .ratingQuery()
//       .priceQuery()
//       .highPriceQuery()
//       .searchQuery()
//       // .sortByPrice()
//       .countProducts();

//     return {
//       result,
//       totalproduct,
//     };
//   } catch (e) {
//     return e.message;
//   }
// };

// export const getAllproductsFeature = async (page) => {
//   try {
//     const db = await connectToDB();
//     const products = await db
//       .collection("products")
//       .find()
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * 3)
//       .limit(3)
//       .toArray();

//     return products.map((product, index) => (
//       <Fragment key={product._id}>
//         <ProductCard data={product} i={index} />
//       </Fragment>
//     ));
//   } catch (e) {
//     return e.message;
//   }
// };
// product.js
export const getAllproductsFeature = async (page, pageSize = 3) => {
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
    console.error("Error fetching products:", e.message);
    throw e; // Rethrow the error to handle it in the calling code
  }
};

export const getbestElectronic = async () => {
  try {
    const db = await connectToDB();
    const underProducts = await db
      .collection("products")
      .find({
        $or: [
          { discountPrice: { $lt: 500 } },
          { originalPrice: { $lt: 500 } },
          { category: "electronics" },
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

export const getToyProducts = async () => {
  try {
    const db = await connectToDB();
    const underProducts = await db
      .collection("products")
      .find({
        $or: [
          { discountPrice: { $lt: 800 } },
          { originalPrice: { $lt: 800 } },
          { category: "Toys" },
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

export const postProduct = async (data) => {
  console.log(data);
};
