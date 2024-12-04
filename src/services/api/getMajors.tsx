import axios from "axios";

export const fetchMajors = async () => {
    try {
        const response = await axios.get("http://localhost:8001/majors");
        console.log('response: ', response);
        /* console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};