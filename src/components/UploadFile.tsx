import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { DropdownForm } from "./DropdownForm";
import { fetchMajors } from "@/services/api/getMajors";
import { getAllCatedrasBy } from "@/services/api/getSubjects";
import { getAllCalls, getAllTypes, getAllYears } from "@/services/api/getFormData";

export const UploadFile = () => {
    const [formData, setFormData] = useState({
        carrera: "",
        catedra: "",
        tipo: "",
        anio: "",
        llamado: "",
    });
    const [carreras, setCarreras] = useState<string[]>([]);
    const [catedras, setCatedras] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [calls, setCalls] = useState<string[]>([]);

    useEffect(() => {
        // Fetch data from API
        const fetchingFormData = async () => {
            try {
                const carreras = await fetchMajors();
                setCarreras(carreras);
                const catedras = await getAllCatedrasBy(formData.carrera);
                setCatedras(catedras);
                const types = await getAllTypes();
                setTypes(types);
                const years = await getAllYears(formData.carrera);
                setYears(years);
                const calls = await getAllCalls();
                setCalls(calls);
            } catch (error) {
                console.error("Error fetching aph:", error);
            }
        };
        fetchingFormData();

        return () => {
            console.log('unmounting');
        };
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value as string,
        });
    };

    const carreraForm = {
        label: "Carrera",
        id: "carrera",
        name: "carrera",
    };

    const catedraForm = {
        label: "Cátedra",
        id: "catedra",
        name: "catedra",
    };

    const typeForm = {
        label: "Tipo de aporte",
        id: "tipo",
        name: "tipo",
    };
    const yearForm = {
        label: "Año",
        id: "anio",
        name: "anio",
    };
    const callForm = {
        label: "Llamado",
        id: "llamado",
        name: "llamado",
    };

    return <div className="flex flex-col items-center">
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={carreras} formOptions={carreraForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={catedras} formOptions={catedraForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={types} formOptions={typeForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={years} formOptions={yearForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={calls} formOptions={callForm} />
    </div>
}
