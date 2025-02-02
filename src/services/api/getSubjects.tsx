import { subjectsForGeography, subjectsForHistory, subjectsForInternationalRelationships } from "@/constants/mockedData";
import axios from "axios";

export const getSubjects = async () => {
    try {
        const response = await axios.get("http://localhost:8001/subjects");
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const getSubjectsNames = async () => {
    try {
        const response = await axios.get("http://localhost:8001/subjects/names");
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}
export const getAllSubjectsBy = async (idCarrera: number) => {
    console.log("entrando aca", idCarrera)
    try {
        const response = await axios.get(`http://localhost:8001/subjects/major/${idCarrera}`);
        console.log('response getAllSubjectsBy: ', response);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getSubjectNameById = async (idMateria: number) => {
    try {
        const response = await axios.get(`http://localhost:8001/subjects/${idMateria}`);
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const getYearsBySubject = async (idCatedra: number) => {
    try {
        const response = await axios.get(`http://localhost:8001/subjects/years/${idCatedra}`);
        /* console.log('response: ', response); */
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};