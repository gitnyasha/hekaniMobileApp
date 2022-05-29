import server from "./server";

const getAnswers = async (offset) => {
  try {
    const response = await server.get(`/answers?offset=${offset}&limit=${10}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return [];
    console.log(error);
  }
};

const getAnswerById = async (id) => {
  try {
    const response = await server.get(`/answers/${id}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return {};
    console.log(error);
  }
};

export default {
  getAnswers,
  getAnswerById,
};
