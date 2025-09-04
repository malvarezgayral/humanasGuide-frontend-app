import { FileRow } from "@/constants/interfacesAndTypes";
import { fetchAllFilesTable, fetchFileTypes } from "@/services/api/getFiles";
import { getMajorsNames } from "@/services/api/getMajors";
import { getSubjectsNames, getYears } from "@/services/api/getSubjects";
import { useEffect, useState } from "react";

export const useTableService = () => {
    const [subjectsOptions, setSubjectsOptions] = useState<string[]>([]);
    const [majorsOptions, setMajorsOptions] = useState<string[]>([]);
    const [typeFilesOptions, setTypeFilesOptions] = useState<string[]>([]);
    const [filesRows, setFilesRows] = useState<FileRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<FileRow[]>([]);
    const [yearsOptions, setYearsOptions] = useState<string[]>([]);

    useEffect(() => {
        // Fetch data from API
        const fetchingData = async () => {
            try {
                Promise.all([fetchAllFilesTable(), fetchFileTypes(), getSubjectsNames(), getMajorsNames(), getYears()]).then((values) => {
                    const files = values[0]
                    const typeFiles = values[1]
                    const subjects = values[2]
                    const majors = values[3]
                    const years = values[4]
                    setFilesRows(files);
                    setFilteredRows(files); // Inicialmente sin filtros
                    setSubjectsOptions(subjects);
                    setMajorsOptions(majors);
                    setTypeFilesOptions(typeFiles);
                    setYearsOptions(years);
                })
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        }
        fetchingData();
        /* return () => {
            console.log("SearchDataTable unmounted");
        }; */
    }, []);

    return { subjectsOptions, majorsOptions, typeFilesOptions, filesRows, filteredRows, setFilteredRows, yearsOptions };
}