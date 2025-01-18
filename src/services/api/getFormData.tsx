import axios from "axios";

export const getAllTypes = async () => {
    try {
        const response = await axios.get("http://localhost:8001/");
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getAllYears = async (carrera: String) => {
    try {
        const response = await axios.get("http://localhost:8001/");
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getAllCalls = async () => {
    try {
        const response = await axios.get("http://localhost:8001/");
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};