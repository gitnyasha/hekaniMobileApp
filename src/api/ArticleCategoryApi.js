import server from "./server";

const getArticleCategories = async () => {
  try {
    const response = await server.get("/article_categories");

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return [];
    console.log(error);
  }
};

const getArticleCategoryById = async (id) => {
  try {
    const response = await server.get(`/article_categories/${id}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return {};
    console.log(error);
  }
};

export default {
  getArticleCategories,
  getArticleCategoryById,
};
