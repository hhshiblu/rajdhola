import prisma from "../../../prisma/prisma";

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
      id: cate.id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate.id),
    });
  }

  return categoryList;
}

export const getCategory = async () => {
  try {
    const categories = await prisma.categories.findMany({});

    // const categoryList = createCategories(categories);

    return categories;
  } catch (error) {
    return error.message;
  }
};
