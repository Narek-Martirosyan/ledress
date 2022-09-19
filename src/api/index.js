import axios from "axios";

const instance = axios.create({
    baseURL: "https://nekoma-server.herokuapp.com/"
});


instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);


    throw error;
});



export default instance;


