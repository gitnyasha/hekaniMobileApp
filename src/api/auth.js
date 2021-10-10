import axios from "axios";

const auth = async () => {
    axios.post(
        "https://hekani-social-media.herokuapp.com/sessions", 
        {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        },
        { withCredentials: true },
        {headers: { 'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com' },}
    ).then(response => {
        if (response.data.logged_in) {
            this.handleSuccess(response.data);
        }
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}

export default auth;