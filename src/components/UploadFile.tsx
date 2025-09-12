"use client";

import { useEffect, useState } from "react";
import CustomSelection from "./CustomSelection";
import { UploadFieldSection } from "./UploadFieldSection";
import { uploadFile } from "@/services/api/getFiles";
import { useUploadService } from "@/hooks/uploadFile/useUploadService";
import { useForm } from "@/hooks/uploadFile/useForm";
import { getMajorByName } from "@/services/api/getMajors";
import { getSubjectByName } from "@/services/api/getSubjects";


export const UploadFile = () => {
    const { carreras, catedras, years, months, types, fetchSubjectYears, fetchSubjects, isLoading } = useUploadService()
    const { pickedMajorValue, pickedSubjectValue, pickedMonthValue, pickedTypeValue, pickedYearValue, setPickedMajorValue,
        setPickedMonthValue, setPickedSubjectValue, setPickedYearValue, setSelectedFile, setPickedTypeValue, errorMessage,
        setErrorMessage, selectedFile, isFormValid
    } = useForm()


    const handleChangeMajor = (event: any) => {
        if (carreras) {
            const selectedMajor = carreras.find((major: { id: number; }) => major.id === Number(event.target.value));
            if (selectedMajor) {
                setPickedMajorValue(selectedMajor);
            }
        }
    }

    useEffect(() => {
        fetchSubjects(pickedMajorValue.id)
    }, [pickedMajorValue.id])

    const handleChangeSubject = (event: any) => {
        const selectedSubject = catedras.find((subject: { id: number; }) => subject.id === Number(event.target.value));
        if (selectedSubject) {
            setPickedSubjectValue(selectedSubject);
        }
    }

    useEffect(() => {
        async function fetchMajorByName(majorName: string) {
            try {
                const major = await getMajorByName(majorName);
                if (major) {
                    setPickedMajorValue(major);
                } else {
                    console.error("Major not found:", majorName);
                }
            } catch (error) {
                console.error("Error fetching major by name:", error);
            }
        }
        async function fetchSubjectByName(subjectName: string) {
            try {
                const subject = await getSubjectByName(subjectName);
                if (subject) {
                    setPickedSubjectValue(subject);
                } else {
                    console.error("Subject not found:", subjectName);
                }
            } catch (error) {
                console.error("Error fetching subject by name:", error);
            }
        }
        //leemos los parametros de la URL si existen para los filtros
        const searchParams = new URLSearchParams(window.location.search);
        const major = searchParams.get('major');
        const subject = searchParams.get('subject');
    
        if (major) {
            fetchMajorByName(major)
        }
        if (subject) {
            fetchSubjectByName(subject);
        }

    }, []);

    useEffect(() => {
        fetchSubjectYears(pickedSubjectValue.id);
    }, [pickedSubjectValue.id])

    const handleChangeType = (event: any) => {
        setPickedTypeValue(event.target.value)
    }

    const handleChangeYear = (event: any) => {
        setPickedYearValue(event.target.value)
    }

    const handleChangeMonth = (event: any) => {
        setPickedMonthValue(event.target.value)
    }

    const handleSubmit = async () => {
        if (!selectedFile) {
            setErrorMessage("No se ha seleccionado ningún archivo válido.");
            return;
        }

        if (typeof isFormValid === 'function' ? isFormValid() : Boolean(isFormValid)) {
            
            // Crear un FormData para enviar el archivo al backend
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("catedraId", pickedSubjectValue?.id.toString() || "");
            formData.append("tipo", pickedTypeValue?.toString() || "");
            formData.append("anio", pickedYearValue?.toString() || "");
            formData.append("llamado", pickedMonthValue?.toString() || "");
            uploadFile(formData);
        } else {
            setErrorMessage("El formulario no es válido para el envío.");
        }
    }

    return <>
        <div className=" bg-primaryWhite w-full flex justify-center pt-12">
            <p className="text-primaryBlack font-thin text-3xl">Sube tu aporte</p>
        </div>
        <div className="flex flex-row items-center h-96 w-full bg-primaryWhite">
            <div className="w-1/3 pl-8">
                <UploadFieldSection handleSubmit={handleSubmit} setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile} />
            </div>
            <div className="w-2/3 flex flex-wrap gap-8">
                {!isLoading && <>
                    <CustomSelection
                        name={pickedMajorValue.name}
                        id={pickedMajorValue.id}
                        setPickedValue={handleChangeMajor}
                        title={'carrera'}
                        iterableOptions={carreras}
                        disable={false} />
                    <CustomSelection
                        name={pickedSubjectValue.name}
                        id={pickedSubjectValue.id}
                        setPickedValue={handleChangeSubject}
                        title={'cátedra'}
                        iterableOptions={catedras}
                        disable={pickedMajorValue.name === ""} />
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
                        disable={pickedTypeValue === "RESUMEN" || pickedSubjectValue.name === ""} />
                    <CustomSelection
                        id={pickedMonthValue}
                        setPickedValue={handleChangeMonth}
                        title={'llamado'}
                        iterableOptions={months}
                        disable={pickedTypeValue !== "FINAL"} />
                </>}
            </div>
        </div>
    </>
}