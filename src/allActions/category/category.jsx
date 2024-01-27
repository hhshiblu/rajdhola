// import prisma from "../../../prisma/prisma";

// function createCategories(categories, parentId = null) {
//   const categoryList = [];
//   let category;
//   if (parentId == null) {
//     category = categories.filter((cat) => cat.parentId == undefined);
//   } else {
//     category = categories.filter((cat) => cat.parentId == parentId);
//   }

//   for (let cate of category) {
//     categoryList.push({
//       id: cate.id,
//       name: cate.name,
//       slug: cate.slug,
//       parentId: cate.parentId,
//       children: createCategories(categories, cate.id),
//     });
//   }

//   return categoryList;
// }

// export const getCategory = async () => {
//   try {
//     const categories = await prisma.categories.findMany({});

//     const categoryList = createCategories(categories);

//     return categoryList;
//   } catch (error) {
//     return error.message;
//   }
// };

"use server";

import connectToDB from "@/libs/connect";

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id.toString(),
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

export const getCategory = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");

    const category = await collection.find({}).toArray();

    const categoryList = createCategories(category);
    return categoryList;
  } catch (err) {
    return err.message;
  }
};
