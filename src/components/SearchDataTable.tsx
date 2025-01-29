"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField, Autocomplete } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchAllFilesTable, fetchFileTypes } from "@/services/api/getFiles";
import { getSubjectsNames } from "@/services/api/getSubjects";

interface FileRow {
    id: number;
    name: string;
    subject: string;
    quarter: number;
    type: string;
    uploadDate: string;
    url: string;
    month: string;
}

export const SearchDataTable = () => {
    const [subjectsOptions, setSubjectsOptions] = React.useState<string[]>([]);
    const [typeFilesOptions, setTypeFilesOptions] = React.useState<string[]>([]);
    const [filesRows, setFilesRows] = React.useState<FileRow[]>([]);
    const [filteredRows, setFilteredRows] = React.useState<FileRow[]>([]);
    const [filters, setFilters] = React.useState({
        name: "",
        subject: "",
        type: "",
        startDate: null,
        endDate: null,
    });

    React.useEffect(() => {
        // Fetch data from API
    
        const fetchingData = async () => {
            try {
                const files = await fetchAllFilesTable();
                const typeFiles = await fetchFileTypes();
                const subjects = await getSubjectsNames();
                setFilesRows(files);
                setFilteredRows(files); // Inicialmente sin filtros
                setSubjectsOptions(subjects);
                setTypeFilesOptions(typeFiles);
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        }
        fetchingData();
        return () => {
            console.log("SearchDataTable unmounted");
        };
    }, []);

    // Actualizar los filtros
    const handleFilterChange = (field: string, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    // Filtrar las filas
    React.useEffect(() => {
        let filtered = filesRows;

        if (filters.name) {
            filtered = filtered.filter((row) =>
                row.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.subject) {
            filtered = filtered.filter((row) =>
                row.subject.toLowerCase().includes(filters.subject.toLowerCase())
            );
        }
        if (filters.type) {
            filtered = filtered.filter((row) =>
                row.type.toLowerCase().includes(filters.type.toLowerCase())
            );
        }
        if (filters.startDate) {
            filtered = filtered.filter(
                (row) => dayjs(row.uploadDate) >= dayjs(filters.startDate)
            );
        }
        if (filters.endDate) {
            filtered = filtered.filter(
                (row) => dayjs(row.uploadDate) <= dayjs(filters.endDate)
            );
        }

        setFilteredRows(filtered);
    }, [filters, filesRows]);

    const columns: GridColDef<(typeof filesRows)[number]>[] = [
        { field: "id", headerName: "ID", width: 0 },
        { field: "name", headerName: "Nombre del recurso", width: 150 },
        { field: "subject", headerName: "Cátedra", width: 150 },
        { field: "quarter", headerName: "Cuatrimestre", type: "number", width: 150 },
        { field: "type", headerName: "Tipo de recurso", width: 150 },
        { field: "uploadDate", headerName: "Fecha de subida", width: 110 },
        { field: "url", headerName: "Link", width: 110 },
        { field: "month", headerName: "Llamado", sortable: false, width: 160 },
    ];

    return (
        <div className="h-full w-full bg-primaryWhite py-8">
            {/* Sección de Filtros */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {/* Filtro por Nombre */}
                <TextField
                    label="Nombre del recurso"
                    variant="outlined"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    sx={{ flex: "1 1 200px" }}
                />

                {/* Filtro por Cátedra */}
                <Autocomplete
                    options={subjectsOptions}
                    value={filters.subject}
                    onChange={(e, value) => handleFilterChange("subject", value)}
                    renderInput={(params) => (
                        <TextField {...params} label="Cátedra" variant="outlined" />
                    )}
                    sx={{ flex: "1 1 200px" }}
                />

                {/* Filtro por Tipo */}
                <Autocomplete
                    options={typeFilesOptions}
                    value={filters.type}
                    onChange={(e, value) => handleFilterChange("type", value)}
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo de recurso" variant="outlined" />
                    )}
                    sx={{ flex: "1 1 200px" }}
                />

                {/*
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha desde"
                        value={filters.startDate}
                        onChange={(value: any) => handleFilterChange("startDate", value)}
                        renderInput={(params: any) => (
                            <TextField {...params} variant="outlined" sx={{ flex: "1 1 200px" }} />
                        )}
                    />
                    <DatePicker
                        label="Fecha hasta"
                        value={filters.endDate}
                        onChange={(value: any) => handleFilterChange("endDate", value)}
                        renderInput={(params: any) => (
                            <TextField {...params} variant="outlined" sx={{ flex: "1 1 200px" }} />
                        )}
                    />
                </LocalizationProvider> */}
            </Box>

            {/* Tabla */}
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
};
