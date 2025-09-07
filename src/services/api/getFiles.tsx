import axios from "axios";

export const fetchAllFiles = async () => {  
    try {
        const response = await axios.get("http://localhost:8001/files");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const fetchAllFilesTable = async () => {
    try {
        const response = await axios.get("http://localhost:8001/files/table");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const fetchFileTypes = async () => {
    try {
        const response = await axios.get("http://localhost:8001/files/types");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const fetchMonths = async () => {
    try {
        const response = await axios.get("http://localhost:8001/files/months");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const uploadFile = async (formData: FormData) => {
    try {
        const response = await axios.post("http://localhost:8001/files/save", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
}