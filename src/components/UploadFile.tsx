"use client";

import { useEffect, useState } from "react";
import { fetchMajors } from "@/services/api/getMajors";
import { getAllSubjectsBy } from "@/services/api/getSubjects";
import { getAllCalls, getAllTypes, getAllYears } from "@/services/api/getFormData";
import CustomSelection from "./CustomSelection";
import { UploadFieldSection } from "./UploadFieldSection";


export const UploadFile = () => {
    const [pickedMajorValue, setPickedMajorValue] = useState<number>();
    const [pickedSubjectValue, setPickedSubjectValue] = useState<number>();

    const [carreras, setCarreras] = useState<string[]>([]);
    const [catedras, setCatedras] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [calls, setCalls] = useState<string[]>([]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from API
        const fetchingMajors = async () => {
            try {
                const majors = await fetchMajors(); // manejamos la promesa con async await en este caso
                setCarreras(majors); // updateamos el estado local del componente una vez que la respuesta esperada llegó
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        };
    
        fetchingMajors();

        return () => {
            console.log('unmounting');
        };
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            if (pickedMajorValue) {
                const catedras = await getAllSubjectsBy(pickedMajorValue);
                setCatedras(catedras);
            }
        };

        fetchSubjects();
    }, [pickedMajorValue])

    const handleChangeMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedMajorValue(Number(event.target.value))
    }

    const handleChangeSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedSubjectValue(Number(event.target.value))
    }

    const handleSubmit = async () => {
        if (!selectedFile) {
          setErrorMessage("No se ha seleccionado ningún archivo válido.");
          return;
        }
        console.log('selectedFile: ', selectedFile);
    
        // Crear un FormData para enviar el archivo al backend
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("carrera", pickedMajorValue?.toString() || "");
        formData.append("catedra", pickedSubjectValue?.toString() || "");
        console.log('formData: ', formData);
    }


    return <div className="flex flex-col items-center h-full w-full bg-primaryWhite py-8">
        <UploadFieldSection handleSubmit={handleSubmit} setErrorMessage={setErrorMessage} errorMessage={errorMessage} setSelectedFile={setSelectedFile} selectedFile={selectedFile}/>
        {carreras && carreras.length > 0 && <CustomSelection pickedValue={pickedMajorValue}
            setPickedValue={handleChangeMajor}
            title={'carrera'}
            iterableOptions={carreras} />}
        {pickedMajorValue && catedras && catedras.length > 0 && <CustomSelection pickedValue={pickedSubjectValue}
            setPickedValue={handleChangeSubject}
            title={'cátedra'}
            iterableOptions={catedras} />}
        {/* <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={catedras} formOptions={catedraForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={types} formOptions={typeForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={years} formOptions={yearForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={calls} formOptions={callForm} /> */}
    </div>
}
