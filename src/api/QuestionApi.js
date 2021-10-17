import server from './server'

const getQuestions = async () => {
    try {
        const response = await server.get('/questions');

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return [];
        console.log(error);
    }
}

const getQuestionById = async (id) => {
    try {
        const response = await server.get(`/questions/${id}`);

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {};
        console.log(error);
    }
}

export default {
    getQuestions,
    getQuestionById
};