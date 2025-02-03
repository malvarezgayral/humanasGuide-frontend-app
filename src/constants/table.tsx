import { GridColDef } from "@mui/x-data-grid";
import { FileRow } from "./interfacesAndTypes";

const columns: GridColDef<FileRow>[] = [
    { field: "id", headerName: "ID", width: 0 },
    { field: "name", headerName: "Nombre del recurso", width: 150 },
    { field: "majors", headerName: "Carreras", width: 150 },
    { field: "subject", headerName: "Cátedra", width: 150 },
    { field: "quarter", headerName: "Cuatrimestre", type: "number", width: 150 },
    { field: "type", headerName: "Tipo de recurso", width: 150 },
    { field: "uploadDate", headerName: "Fecha de subida", width: 110 },
    { field: "url", headerName: "Link", width: 110 },
    { field: "month", headerName: "Llamado", sortable: false, width: 160 },
];

export default columns;