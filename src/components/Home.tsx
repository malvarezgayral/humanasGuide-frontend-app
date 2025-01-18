"use client"

import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomSelection from "./CustomSelection";
import { getSubjects } from "@/services/api/getSubjects";
import { fetchMajors } from "@/services/api/getMajors";
import AphorismsBoxGenerator from "./AphorismsBoxGenerator";

function HomeComp() {
    const [pickedMajor, setPickedMajor] = useState('');
    const [subjects, setSubjects] = useState([])
    const [pickedSubject, setPickedSubject] = useState('');
    const [fetchedMajors, setFetchedMajors] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchingMajors = async () => {
            try {
                const data = await fetchMajors(); // manejamos la promesa con async await en este caso
                setFetchedMajors(data); // updateamos el estado local del componente una vez que la respuesta esperada llegó
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        };
    
        fetchingMajors();
    }, [])

    useEffect(() => {
        const subjectsTemp = getSubjects(pickedMajor);
        setSubjects(subjectsTemp);

    }, [pickedMajor])

    const handleChangeMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedMajor(event.target.value)
    }

    const handleChangeSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedSubject(event.target.value)
    }

    return <div className="h-full w-full bg-primaryWhite py-8">
        <AphorismsBoxGenerator />
        <div className="w-full flex flex-col items-center">
            {fetchedMajors && fetchedMajors.length > 0 && <CustomSelection pickedValue={pickedMajor} 
            setPickedValue={handleChangeMajor} 
            title={'carrera'} 
            iterableOptions={fetchedMajors} />}
            {pickedMajor !== '' && subjects && subjects.length > 0 && <CustomSelection pickedValue={pickedSubject} 
            setPickedValue={handleChangeSubject} 
            title={'cátedra'} 
            iterableOptions={subjects} />}
        </div>
        <div className="flex flex-row justify-around py-5">
            <CustomButton title='Buscar aportes' />
            <CustomButton title='Subir aporte' />
        </div>
    </div>
}

export default HomeComp;