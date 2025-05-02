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

    return { filters, setFilters };
}