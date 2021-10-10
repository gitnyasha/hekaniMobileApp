import server from './server'

const register = async (values) => {
    const response = await server.post(
        `/registrations`,
        { 
            withCredentials: true 
        },
        {
            headers: { 
                'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com' 
            },
        }, 
        {
            ...values
        }
    );
}

export default {
    register
};