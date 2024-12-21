import axios from "axios";

export const getAphorism = async () => {
    try {
        const response = await axios.get("http://localhost:8001/ai/aph");
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};