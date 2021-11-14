import server from './server'

const getCategories = async () => {
    try {
        const response = await server.get('/question_categories');

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return [];
        console.log(error);
    }
}

const getCategoryById = async (id) => {
    try {
        const response = await server.get(`/question_categories/${id}`);

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {};
        console.log(error);
    }
}

export default {
    getCategories,
    getCategoryById
};