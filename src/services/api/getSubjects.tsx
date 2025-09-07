import { subjectsForGeography, subjectsForHistory, subjectsForInternationalRelationships } from "@/constants/mockedData";
import axios from "axios";

export const getSubjects = async () => {
    try {
        const response = await axios.get("http://localhost:8001/subjects");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const getSubjectsNames = async () => {
    try {
        const response = await axios.get("http://localhost:8001/subjects/names");
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}
export const getAllSubjectsBy = async (idCarrera: number) => {
    try {
        const response = await axios.get(`http://localhost:8001/subjects/major/${idCarrera}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getSubjectNameById = async (idMateria: number) => {
    try {
        const response = await axios.get(`http://localhost:8001/subjects/${idMateria}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

export const getSubjectByName = async (name: string) => {
    try {
        const encodedName = encodeURIComponent(name);
        const response = await axios.get(`http://localhost:8001/subjects/name/${encodedName}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getYearsBySubject = async (idCatedra: number) => {
    try {
        const response = await axios.get(`http://localhost:8001/subjects/years/${idCatedra}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const getYears = async () => {
    try {
        const response = await axios.get(`http://localhost:8001/subjects/years`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};