import { FileRow } from "@/constants/interfacesAndTypes";
import { fetchAllFilesTable, fetchFileTypes } from "@/services/api/getFiles";
import { getMajorsNames } from "@/services/api/getMajors";
import { getSubjectsNames } from "@/services/api/getSubjects";
import { useEffect, useState } from "react";

export const useTableService = () => {
    const [subjectsOptions, setSubjectsOptions] = useState<string[]>([]);
    const [majorsOptions, setMajorsOptions] = useState<string[]>([]);
    const [typeFilesOptions, setTypeFilesOptions] = useState<string[]>([]);
    const [filesRows, setFilesRows] = useState<FileRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<FileRow[]>([]);

    useEffect(() => {
        //leemos los parametros de la URL si existen para los filtros
        /* const searchParams = new URLSearchParams(window.location.search);
        const major = searchParams.get('major');
        const subject = searchParams.get('subject');
    
        if (subject) {
            handleFilterChange("subject", subject);
        }
        if (major) {
            handleFilterChange("majors", major);
        } */
        // Fetch data from API
        const fetchingData = async () => {
            try {
                const files = await fetchAllFilesTable();
                const typeFiles = await fetchFileTypes();
                const subjects = await getSubjectsNames();
                const majors = await getMajorsNames();
                /* console.log(subjects);
                console.log(majors); */
                setFilesRows(files);
                setFilteredRows(files); // Inicialmente sin filtros
                setSubjectsOptions(subjects);
                setMajorsOptions(majors);
                setTypeFilesOptions(typeFiles);
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        }
        fetchingData();
        /* return () => {
            console.log("SearchDataTable unmounted");
        }; */
    }, []);

    return { subjectsOptions, majorsOptions, typeFilesOptions, filesRows, filteredRows, setFilteredRows };
}