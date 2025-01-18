import { subjectsForGeography, subjectsForHistory, subjectsForInternationalRelationships } from "@/constants/mockedData";
import axios from "axios";

export const getAllCatedrasBy = async (carrera: String) => {
    try {
        const response = await axios.get("http://localhost:8001/");
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getSubjects = (major: string) => {
    let data;
    switch (major) {
        case 'historia':
            data = subjectsForHistory;
            break;
        case 'rel_int':
            data = subjectsForInternationalRelationships
            break;
        case 'geografia':
            data = subjectsForGeography
            break;

        default:
            break;
    }

    return data as [];
}