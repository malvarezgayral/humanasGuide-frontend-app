"use client"

import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomSelection from "./CustomSelection";
import { getAllSubjectsBy } from "@/services/api/getSubjects";
import { fetchMajors } from "@/services/api/getMajors";
import AphorismsBoxGenerator from "./AphorismsBoxGenerator";
import Link from "next/link";

function HomeComp() {
    const [pickedMajorValue, setPickedMajorValue] = useState<number>();
    const [subjects, setSubjects] = useState([])
    const [pickedSubject, setPickedSubject] = useState('');
    const [fetchedMajors, setFetchedMajors] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchingMajors = async () => {
            try {
                const data = await fetchMajors(); // manejamos la promesa con async await en este caso
                console.log(data)
                setFetchedMajors(data); // updateamos el estado local del componente una vez que la respuesta esperada llegó
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        };
    
        fetchingMajors();
    }, [])

    useEffect(() => {
        const fetchSubjects = async () => {
            if (pickedMajorValue) {
                const subjects = await getAllSubjectsBy(pickedMajorValue);
                if (subjects && subjects.length > 0) setSubjects(subjects);
            }
        };

        fetchSubjects();
    }, [pickedMajorValue])

    const handleChangeMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedMajorValue(Number(event.target.value))
    }

    const handleChangeSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedSubject(event.target.value)
    }

    return <div className="h-full w-full bg-primaryWhite py-8">
        <AphorismsBoxGenerator />
        <div className="w-full flex flex-col items-center">
            {fetchedMajors && fetchedMajors.length > 0 && <CustomSelection pickedValue={pickedMajorValue} 
            setPickedValue={handleChangeMajor} 
            title={'carrera'} 
            iterableOptions={fetchedMajors} />}
            {pickedMajorValue && subjects && subjects.length > 0 && <CustomSelection pickedValue={pickedSubject} 
            setPickedValue={handleChangeSubject} 
            title={'cátedra'} 
            iterableOptions={subjects} />}
        </div>
        <div className="flex flex-row justify-around py-5">
            <Link href="">
                <CustomButton title='Buscar aportes' />
            </Link>
            <Link href="\upload">
                <CustomButton title='Subir aporte' />
            </Link>
        </div>
    </div>
}

export default HomeComp;