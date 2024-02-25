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
      image: cate.image,
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
    return categoryList ? categoryList : [];
  } catch (err) {
    return { error: err.message };
  }
};

function createCategoriesWithChildren(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId === null) {
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
      image: cate.image,
      children: createCategoriesWithChildren(categories, cate._id),
    });
  }

  return categoryList;
}

// export const getCategory = async () => {
//   try {
//     const db = await connectToDB();
//     const collection = db.collection("categories");

//     const category = await collection.find({}).toArray();

//     const categoryList = createCategoriesWithChildren(category);
//     console.log(JSON.parse(categoryList));
//     return categoryList ? categoryList : [];
//   } catch (err) {
//     return { error: err.message };
//   }
// };

export const getChildrensChildren = async (mainCategory, childName) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");

    const category = await collection.find({}).toArray();
    const categoryList = createCategoriesWithChildren(category);

    const mainCategorries = categoryList.find(
      (cat) => cat.name === mainCategory
    );

    const childCategory = mainCategorries.children.find(
      (child) => child.name === childName
    );

    const childrensChildren = childCategory.children;

    return childrensChildren ? childrensChildren : [];
  } catch (err) {
    return { error: err.message };
  }
};
