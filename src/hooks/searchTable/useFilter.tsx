import { FileRow } from "@/constants/interfacesAndTypes";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const useFilter = (filesRows: FileRow[] = [], filteredRows: FileRow[], setFilteredRows: Function) => {
    const [filters, setFilters] = useState({
        name: "",
        subject: "",
        majors: "",
        type: "",
        year: "",
        startDate: null,
        endDate: null,
    });

    // Actualizar los filtros
        const handleFilterChange = (field: keyof FileRow | 'name' | 'subject' | 'majors' | 'type' | 'year' | 'startDate' | 'endDate', value: any) => {
            setFilters((prev) => ({ ...prev, [field]: value }));
        }
    
        useEffect(() => {
            //leemos los parametros de la URL si existen para los filtros
            const searchParams = new URLSearchParams(window.location.search);
            const major = searchParams.get('major');
            const subject = searchParams.get('subject');
            
    
            if (subject) {
                handleFilterChange("subject", subject);
            }
            if (major) {
                handleFilterChange("majors", major);
            }
        }, []);

    const filterRows = (field: keyof typeof filters, filtered: FileRow[]) => {
        console.log("field: ", field)
        if (field) {
            filtered = filtered.filter((row) => {
                console.log("row[field]: ", row[field as keyof FileRow]);
                return (row[field as keyof FileRow]?.toString().toLowerCase() || "").includes((filters[field]?.toString().toLowerCase() || ""))
            }
                
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
        filtered = filterRows('year', filtered);

        /* filtered = filterRows(filters.major, filtered); */
        if (filters.majors) {
            filtered = filtered.filter(
                (row) => {
                    return row.majors.some(major => major.name.includes(filters.majors))
                }
            );

        }
        // Filtro por rango de fechas (inclusive)
        if (filters.startDate) {
            const startMs = dayjs(filters.startDate as any).startOf('day').valueOf();
            filtered = filtered.filter((row) => {
                const rowMs = new Date(row.uploadDate as unknown as string | number | Date).setHours(0, 0, 0, 0);
                return rowMs >= startMs;
            });
        }
        if (filters.endDate) {
            const endMs = dayjs(filters.endDate as any).endOf('day').valueOf();
            filtered = filtered.filter((row) => {
                const rowMs = new Date(row.uploadDate as unknown as string | number | Date).setHours(0, 0, 0, 0);
                return rowMs <= endMs;
            });
        }

        setFilteredRows(filtered);
    }, [filters, filesRows]);

    return { filters, setFilters, handleFilterChange };
}