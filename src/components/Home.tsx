"use client"

import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomSelection from "./CustomSelection";
import { getAllSubjectsBy, getSubjectNameById } from "@/services/api/getSubjects";
import { fetchMajors } from "@/services/api/getMajors";
import AphorismsBoxGenerator from "./AphorismsBoxGenerator";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HomeComp() {
    const [pickedMajorValue, setPickedMajorValue] = useState({
        anio_inicio: 0,
        id: 0,
        name: "",
        officialPage: ""
    });
    const [pickedSubject, setPickedSubject] = useState({
        id: 0,
        majorIds: [],
        name: "",
        quarter: 0,
        year: 0
    });
    const [subjects, setSubjects] = useState<any>([])
    const [fetchedMajors, setFetchedMajors] = useState<any>(null);
    const router = useRouter();

    /* console.log(router) */
    /* console.log("subjects ", subjects)
    console.log("major value picked ", pickedMajorValue) */

    const handleNavigate = () => {
        /* const fetchingSubjectName = async () => {
            const subjectName = await getSubjectNameById(Number(pickedSubject));
            return subjectName; 
        }
        const subjectName = fetchingSubjectName() */
        router.push(`/search?major=${pickedMajorValue.name}&subject=${pickedSubject.name}`)
    }

    useEffect(() => {
        const fetchingMajors = async () => {
            try {
                const data = await fetchMajors(); // manejamos la promesa con async await en este caso
                /* console.log(data) */
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
                const subjects = await getAllSubjectsBy(pickedMajorValue.id);
                if (subjects && subjects.length > 0) setSubjects(subjects);
            }
        };

        fetchSubjects();
    }, [pickedMajorValue])

    const handleChangeMajor = (event: any) => {
        if (fetchedMajors) {
            const selectedMajor = fetchedMajors.find((major: { id: number; }) => major.id === Number(event.target.value));
            if (selectedMajor) {
                setPickedMajorValue(selectedMajor);
            }
        }
    }

    const handleChangeSubject = (event: any) => {
        const selectedSubject = subjects.find((subject: { id: number; }) => subject.id === Number(event.target.value));
        if (selectedSubject) {
            setPickedSubject(selectedSubject);
        }
    }

    return <div className="h-full w-full bg-primaryWhite py-8">
        <AphorismsBoxGenerator />
        <div className="w-full flex flex-col items-center">
            {fetchedMajors && fetchedMajors.length > 0 && <CustomSelection
                name={pickedMajorValue.name}
                id={pickedMajorValue.id}
                setPickedValue={handleChangeMajor}
                title={'carrera'}
                iterableOptions={fetchedMajors} />}
            {pickedMajorValue && subjects && subjects.length > 0 && <CustomSelection
                name={pickedSubject.name}
                id={pickedSubject.id}
                setPickedValue={handleChangeSubject}
                title={'cátedra'}
                iterableOptions={subjects} />}
        </div>
        <div className="flex flex-row justify-around py-5">
            <div>
                <CustomButton handleEventClick={handleNavigate} title='Buscar aportes' />
            </div>
            <Link href="\upload">
                <CustomButton handleEventClick={() => console.log('')} title='Subir aporte' />
            </Link>
        </div>
    </div>
}

export default HomeComp;