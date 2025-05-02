import { FileRow } from "@/constants/interfacesAndTypes";
import { SetStateAction, useEffect, useState } from "react";

export const useFilter = (filesRows: FileRow[] = [], filteredRows: FileRow[], setFilteredRows: Function) => {
    const [filters, setFilters] = useState({
        name: "",
        subject: "",
        majors: "",
        type: "",
        startDate: null,
        endDate: null,
    });

    // Actualizar los filtros
        const handleFilterChange = (field: keyof FileRow | 'name' | 'subject' | 'majors' | 'type' | 'startDate' | 'endDate', value: any) => {
            setFilters((prev) => ({ ...prev, [field]: value }));
        }
    
        useEffect(() => {
            //leemos los parametros de la URL si existen para los filtros
            const searchParams = new URLSearchParams(window.location.search);
            console.log("searchParams: ", searchParams)
            const major = searchParams.get('major');
            const subject = searchParams.get('subject');
            console.log("major: ", major)
            console.log("subject: ", subject)
    
            if (subject) {
                handleFilterChange("subject", subject);
            }
            if (major) {
                handleFilterChange("majors", major);
            }
        }, []);

    const filterRows = (field: keyof typeof filters, filtered: FileRow[]) => {
        if (field) {
            filtered = filtered.filter((row) =>
                (row[field as keyof FileRow]?.toString().toLowerCase() || "").includes((filters[field]?.toString().toLowerCase() || ""))
            );
        }
        return filtered;
    }

    // Filtrar las filas
    useEffect(() => {
        let filtered = filesRows;

        filtered = filterRows('name', filtered);
        filtered = filterRows('subject', filtered);
        filtered = filterRows('type', filtered);

        /* filtered = filterRows(filters.major, filtered); */
        if (filters.majors) {
            filtered = filtered.filter(
                (row) => {
                    return row.majors.some(major => major.name.includes(filters.majors))
                }
            );

        }
        /* if (filters.startDate) {
            filtered = filtered.filter(
                (row) => dayjs(row.uploadDate) >= dayjs(filters.startDate)
            );
        }
        if (filters.endDate) {
            filtered = filtered.filter(
                (row) => dayjs(row.uploadDate) <= dayjs(filters.endDate)
            );
        } */

        setFilteredRows(filtered);
    }, [filters, filesRows]);

    return { filters, setFilters, handleFilterChange };
}