"use client";

import { useEffect, useState } from "react";
import { fetchMajors } from "@/services/api/getMajors";
import { getAllSubjectsBy, getYearsBySubject } from "@/services/api/getSubjects";
import CustomSelection from "./CustomSelection";
import { UploadFieldSection } from "./UploadFieldSection";
import { fetchFileTypes, fetchMonths, uploadFile } from "@/services/api/getFiles";


export const UploadFile = () => {
    const [pickedMajorValue, setPickedMajorValue] = useState({
        anio_inicio: 0,
        id: 0,
        name: "",
        officialPage: ""
    });
    const [pickedSubjectValue, setPickedSubjectValue] = useState({
        id: 0,
        majorIds: [],
        name: "",
        quarter: 0,
        year: 0
    });
    const [pickedTypeValue, setPickedTypeValue] = useState<String>("");
    const [pickedYearValue, setPickedYearValue] = useState<Number>();
    const [pickedMonthValue, setPickedMonthValue] = useState<String>("");

    const [carreras, setCarreras] = useState([]);
    const [catedras, setCatedras] = useState([]);
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
                console.log('typeFiles: ', typeFiles);
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
                const catedras = await getAllSubjectsBy(pickedMajorValue.id);
                setCatedras(catedras);
            }
        };

        fetchSubjects();
    }, [pickedMajorValue])

    useEffect(() => {
        const fetchSubjectYears = async () => {
            if (pickedSubjectValue) {
                const years = await getYearsBySubject(pickedSubjectValue.id);
                console.log('years: ', years);
                setYears(years);
            }
        };

        fetchSubjectYears();
    }, [pickedSubjectValue])

    useEffect(() => {
        if (pickedTypeValue === "FINAL") {
            const getMonths = async () => {
                const months = await fetchMonths();
                console.log('months: ', months);
                setMonths(months);
            };

            getMonths();

        } else {
            /* console.log('resetting months'); */
            setPickedMonthValue("");
            setMonths([]);
            if (pickedTypeValue === "RESUMEN") {
                /* console.log('resetting years'); */
                setPickedYearValue(undefined);
                setYears([]);
            }
        }

    }, [pickedTypeValue])

    const handleChangeMajor = (event: any) => {
        if (carreras) {
            const selectedMajor = carreras.find((major: { id: number; }) => major.id === Number(event.target.value));
            if (selectedMajor) {
                setPickedMajorValue(selectedMajor);
            }
        }
    }

    const handleChangeSubject = (event: any) => {
        const selectedSubject = catedras.find((subject: { id: number; }) => subject.id === Number(event.target.value));
        if (selectedSubject) {
            setPickedSubjectValue(selectedSubject);
        }
    }

    const handleChangeType = (event: any) => {
        setPickedTypeValue(event.target.value)
    }

    const handleChangeYear = (event: any) => {
        setPickedYearValue(event.target.value)
    }

    const handleChangeMonth = (event: any) => {
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
            console.log(pickedSubjectValue)
            console.log(pickedYearValue)
            // Crear un FormData para enviar el archivo al backend
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("catedra", pickedSubjectValue?.id.toString() || "");
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
        <UploadFieldSection handleSubmit={handleSubmit} setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile} />
        {carreras && carreras.length > 0 &&
            <CustomSelection
                name={pickedMajorValue.name}
                id={pickedMajorValue.id}
                setPickedValue={handleChangeMajor}
                title={'carrera'}
                iterableOptions={carreras}
                disable={false} />}
        <CustomSelection
            name={pickedSubjectValue.name}
            id={pickedSubjectValue.id}
            setPickedValue={handleChangeSubject}
            title={'cátedra'}
            iterableOptions={catedras}
            disable={pickedMajorValue == null} />
        <CustomSelection
            id={pickedTypeValue}
            setPickedValue={handleChangeType}
            title={'tipo'}
            iterableOptions={types}
            disable={false} />
        <CustomSelection
            id={pickedYearValue}
            setPickedValue={handleChangeYear} 
            title={'año'} 
            iterableOptions={years}
            disable={pickedTypeValue === "RESUMEN"} />
        <CustomSelection
            id={pickedMonthValue}
            setPickedValue={handleChangeMonth} 
            title={'llamado'} 
            iterableOptions={months}
            disable={pickedTypeValue !== "FINAL"} />
    </div>
}