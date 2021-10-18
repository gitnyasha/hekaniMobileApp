import server from './server'

const getAnswers = async () => {
    try {
        const response = await server.get('/answers');

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return [];
    }
}

const getAnswerById = async (id) => {
    try {
        const response = await server.get(`/answers/${id}`);

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {};
        console.log(error);
    }
}

export default {
    getAnswers,
    getAnswerById
};