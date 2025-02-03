import axios from "axios";

export const fetchMajors = async () => {
    try {
        const response = await axios.get("http://localhost:8001/majors");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getMajorsNames = async () => {
    try {
        const response = await axios.get("http://localhost:8001/majors/names");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}