import server from "./server";

const getQuestions = async (offset) => {
  try {
    const response = await server.get(`/questions?offset=${offset}&limit=${5}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return [];
    console.log(error);
  }
};

const getQuestionById = async (id) => {
  try {
    const response = await server.get(`/questions/${id}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return {};
    console.log(error);
  }
};

export default {
  getQuestions,
  getQuestionById,
};
