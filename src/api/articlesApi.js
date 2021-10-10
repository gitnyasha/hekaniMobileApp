import server from './server'

const getArticles = async () => {
    try {
        const response = await server.get('/posts');

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return [];
        console.log(error);
    }
}

const getArticleById = async (id) => {
    try {
        const response = await server.get(`/posts/${id}`);

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {};
        console.log(error);
    }
}

export default {
    getArticles,
    getArticleById
};