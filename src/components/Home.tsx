"use client"

import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomSelection from "./CustomSelection";
import { majors } from "@/constants/mockedData";
import { getSubjects } from "@/services/api/getSubjects";

function HomeComp() {
    const [pickedMajor, setPickedMajor] = useState('');
    const [subjects, setSubjects] = useState([])
    const [pickedSubject, setPickedSubject] = useState('');

    useEffect(() => {
        const subjectsTemp = getSubjects(pickedMajor);
        console.log('subj: ', subjectsTemp);
        setSubjects(subjectsTemp);

    }, [pickedMajor])

    const handleChangeMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedMajor(event.target.value)
    }

    const handleChangeSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedSubject(event.target.value)
    }

    console.log('major: ', pickedMajor)

    return <div className="h-full w-full bg-primaryWhite py-8">
        <div className="w-full flex flex-col items-center">
            <CustomSelection pickedValue={pickedMajor} setPickedValue={handleChangeMajor} title={'carrera'} iterableOptions={majors} />
            {pickedMajor !== '' && subjects && subjects.length > 0 && <CustomSelection pickedValue={pickedSubject} setPickedValue={handleChangeSubject} title={'cátedra'} iterableOptions={subjects} />}
        </div>

        <div className="flex flex-row justify-around py-5">
            <CustomButton title='Buscar aportes' />
            <CustomButton title='Subir aporte' />
        </div>

    </div>
}

export default HomeComp;