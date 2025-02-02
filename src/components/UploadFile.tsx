"use client";

import { useEffect, useState } from "react";
import { fetchMajors } from "@/services/api/getMajors";
import { getAllSubjectsBy, getYearsBySubject } from "@/services/api/getSubjects";
import CustomSelection from "./CustomSelection";
import { UploadFieldSection } from "./UploadFieldSection";
import { fetchFileTypes, fetchMonths, uploadFile } from "@/services/api/getFiles";


export const UploadFile = () => {
    const [pickedMajorValue, setPickedMajorValue] = useState<number | null>(null);
    const [pickedSubjectValue, setPickedSubjectValue] = useState<number | null>(null);
    const [pickedTypeValue, setPickedTypeValue] = useState<String | null>(null);
    const [pickedYearValue, setPickedYearValue] = useState<number | null>(null);
    const [pickedMonthValue, setPickedMonthValue] = useState<String | null>(null);

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

    useEffect(() => {
        if (pickedTypeValue === "FINAL") {
            const getMonths = async () => {
                const months = await fetchMonths();
                setMonths(months);
            };

            getMonths();

        } else {
            /* console.log('resetting months'); */
            setPickedMonthValue(null);
            setMonths([]);
            if (pickedTypeValue === "RESUMEN") {
                /* console.log('resetting years'); */
                setPickedYearValue(null);
                setYears([]);
            }
        }

    }, [pickedTypeValue])

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

    const isMonthValid = () => {
        return pickedMonthValue && pickedTypeValue === "FINAL" || !pickedMonthValue && pickedTypeValue !== "FINAL";
    }

    const isYearValid = () => {
        return pickedYearValue && pickedTypeValue !== "RESUMEN" || !pickedYearValue && pickedTypeValue === "RESUMEN";
    }

    const isFormValid = () => {
        return selectedFile && pickedMajorValue && pickedSubjectValue && pickedTypeValue && isYearValid() && isMonthValid();
    }

    const handleSubmit = async () => {
        if (!selectedFile) {
            setErrorMessage("No se ha seleccionado ningún archivo válido.");
            return;
        }
        /* console.log('selectedFile: ', selectedFile); */

        if (isFormValid()) {
            // Crear un FormData para enviar el archivo al backend
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("carrera", pickedMajorValue?.toString() || "");
            formData.append("catedra", pickedSubjectValue?.toString() || "");
            formData.append("tipo", pickedTypeValue?.toString() || "");
            formData.append("anio", pickedYearValue?.toString() || "");
            formData.append("llamado", pickedMonthValue?.toString() || "");
            /* console.log('formData: ', formData); */
            uploadFile(formData);
        } else {
            setErrorMessage("El formulario no es válido para el envío.");
        }
    }


    return <div className="flex flex-col items-center h-full w-full bg-primaryWhite py-8">
        <UploadFieldSection handleSubmit={handleSubmit} setErrorMessage={setErrorMessage} errorMessage={errorMessage} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
        {carreras && carreras.length > 0 && <CustomSelection pickedValue={pickedMajorValue}
            setPickedValue={handleChangeMajor}
            title={'carrera'}
            iterableOptions={carreras}
            disable={false} />}
        <CustomSelection pickedValue={pickedSubjectValue}
            setPickedValue={handleChangeSubject}
            title={'cátedra'}
            iterableOptions={catedras}
            disable={pickedMajorValue == null} />
        <CustomSelection pickedValue={pickedTypeValue}
            setPickedValue={handleChangeType} title={'tipo'} iterableOptions={types}
            disable={false} />
        <CustomSelection pickedValue={pickedYearValue}
            setPickedValue={handleChangeYear} title={'año'} iterableOptions={years}
            disable={pickedTypeValue === "RESUMEN"} />
        <CustomSelection pickedValue={pickedMonthValue}
            setPickedValue={handleChangeMonth} title={'llamado'} iterableOptions={months}
            disable={pickedTypeValue !== "FINAL"} />
    </div>
}