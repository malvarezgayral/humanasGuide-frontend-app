"use client";

import { useEffect, useState } from "react";
import { fetchMajors } from "@/services/api/getMajors";
import { getAllSubjectsBy, getYearsBySubject } from "@/services/api/getSubjects";
import { getAllCalls, getAllTypes, getAllYears } from "@/services/api/getFormData";
import CustomSelection from "./CustomSelection";
import { UploadFieldSection } from "./UploadFieldSection";
import { fetchFileTypes, fetchMonths, uploadFile } from "@/services/api/getFiles";


export const UploadFile = () => {
    const [pickedMajorValue, setPickedMajorValue] = useState<number>();
    const [pickedSubjectValue, setPickedSubjectValue] = useState<number>();
    const [pickedTypeValue, setPickedTypeValue] = useState<String>();
    const [pickedYearValue, setPickedYearValue] = useState<number>();
    const [pickedMonthValue, setPickedMonthValue] = useState<String>();

    const [carreras, setCarreras] = useState<string[]>([]);
    const [catedras, setCatedras] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<string[]>([]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from API
        const fetchingMajors = async () => {
            try {
                const majors = await fetchMajors(); // manejamos la promesa con async await en este caso
                setCarreras(majors); // updateamos el estado local del componente una vez que la respuesta esperada llegó
                const typeFiles = await fetchFileTypes();
                setTypes(typeFiles);
                const months = await fetchMonths();
                setMonths(months);
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

    useEffect(() => {
        const fetchSubjectYears = async () => {
            if (pickedSubjectValue) {
                const years = await getYearsBySubject(pickedSubjectValue);
                setYears(years);
            }
        };

        fetchSubjectYears();
    }, [pickedSubjectValue])

    const handleChangeMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedMajorValue(Number(event.target.value))
    }

    const handleChangeSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedSubjectValue(Number(event.target.value))
    }

    const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedTypeValue(event.target.value)
    }

    const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedYearValue(Number(event.target.value))
    }

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedMonthValue(event.target.value)
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
        formData.append("tipo", pickedTypeValue?.toString() || "");
        formData.append("anio", pickedYearValue?.toString() || "");
        formData.append("llamado", pickedMonthValue?.toString() || "");
        console.log('formData: ', formData);
        uploadFile(formData);
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
        {types && types.length > 0 && <CustomSelection pickedValue={pickedTypeValue} 
        setPickedValue={handleChangeType} title={'tipo'} iterableOptions={types} />}
        {pickedSubjectValue && years && years.length > 0 && <CustomSelection pickedValue={pickedYearValue} 
        setPickedValue={handleChangeYear} title={'año'} iterableOptions={years} />}
        {months && months.length > 0 && <CustomSelection pickedValue={pickedMonthValue} 
        setPickedValue={handleChangeMonth} title={'llamado'} iterableOptions={months} />}
        {/* <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={catedras} formOptions={catedraForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={types} formOptions={typeForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={years} formOptions={yearForm} />
        <DropdownForm formData={formData} handleChange={handleChange} iterableOptions={calls} formOptions={callForm} /> */}
    </div>
}
