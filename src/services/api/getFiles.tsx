import axios from "axios";

export const fetchAllFiles = async () => {  
    try {
        const response = await axios.get("http://localhost:8001/files");
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const fetchAllFilesTable = async () => {
    try {
        const response = await axios.get("http://localhost:8001/files/table");
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const fetchFileTypes = async () => {
    try {
        const response = await axios.get("http://localhost:8001/files/types");
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const fetchMonths = async () => {
    try {
        const response = await axios.get("http://localhost:8001/files/months");
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const uploadFile = async (formData: any) => {
    console.log(formData.get('file'));
    try {
        const response = await axios.post("http://localhost:8001/files/save", formData);
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}	