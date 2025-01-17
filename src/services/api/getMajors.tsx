import axios from "axios";

export const fetchMajors = async () => {
    try {
        const response = await axios.get("http://localhost:8001/majors");
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};