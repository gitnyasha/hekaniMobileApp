import server from "./server";

const getArticles = async (offset) => {
  try {
    const response = await server.get(`/articles?offset=${offset}&limit=${5}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return [];
    console.log(error);
  }
};

const getArticleById = async (id) => {
  try {
    const response = await server.get(`/articles/${id}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return {};
    console.log(error);
  }
};

export default {
  getArticles,
  getArticleById,
};
