"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Autocomplete } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import columns from "@/constants/table";
import { useTableService } from "@/hooks/searchTable/useTableService";
import { useFilter } from "@/hooks/searchTable/useFilter";

export const SearchDataTable = () => {
    

    const { subjectsOptions, majorsOptions, typeFilesOptions, filesRows, filteredRows, setFilteredRows } = useTableService()
    const { filters, handleFilterChange } = useFilter(filesRows, filteredRows, setFilteredRows)

    return (
        <div className="h-full w-full bg-primaryWhite py-8">
            {/* Sección de Filtros */}
            <div className="px-8 py-2 flex flex-row gap-3">
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

                {/* Filtro por Carrera */}
                <Autocomplete
                    options={majorsOptions}
                    value={filters.majors}
                    onChange={(e, value) => handleFilterChange("majors", value)}
                    renderInput={(params) => (
                        <TextField {...params} label="Carrera" variant="outlined" />
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
                </LocalizationProvider>
            </div>
            <div className="mx-8 my-2 h-[370px] w-[1460px] border-2 border-solid rounded-lg">  {/* Tabla */}
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
                    /* checkboxSelection */
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};
