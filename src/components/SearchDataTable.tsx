"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchAllFilesTable } from '@/services/api/getFiles';

export const SearchDataTable = () => {
    const [filesRows, setFilesRows] = React.useState([]);

    React.useEffect(() => {
        // Fetch data from API
        const fetchingFiles = async () => {
            try {
                const files = await fetchAllFilesTable(); // manejamos la promesa con async await en este caso
                console.log('files: ', files);
                setFilesRows(files); // updateamos el estado local del componente una vez que la respuesta esperada llegó
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        }
        fetchingFiles();
        return () => {
            console.log('SearchDataTable unmounted');
        }
     }, []);

    const columns: GridColDef<(typeof filesRows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 0 },
        {
            field: 'name',
            headerName: 'Nombre del recurso',
            width: 150,
            editable: true,
        },
        {
            field: 'subject',
            headerName: 'Cátedra',
            width: 150,
            editable: true,
        },
        {
            field: 'quarter',
            headerName: 'Cuatrimestre',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'type',
            headerName: 'Tipo de recurso',
            width: 150,
            editable: true,
        },
        {
            field: 'uploadDate',
            headerName: 'Fecha de subida',
            width: 110,
            editable: true,
        },
        {
            field: 'url',
            headerName: 'Link',
            width: 110,
            editable: true,
        },
        {
            field: 'month',
            headerName: 'Llamado',
            /* description: 'This column has a value getter and is not sortable.', */
            sortable: false,
            width: 160,
            /* valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`, */
        },
    ];

    return <div className="h-full w-full bg-primaryWhite py-8">
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={filesRows}
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
}