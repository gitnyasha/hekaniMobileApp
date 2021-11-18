import server from './server'

const getUsers = async () => {
    try {
        const response = await server.get('/users');

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return [];
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        const response = await server.get(`/users/${id}`);

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {};
        console.log(error);
    }
}

export default {
    getUsers,
    getUserById
};