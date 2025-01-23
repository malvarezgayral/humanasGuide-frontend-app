"use client"

import { fetchMajors } from "@/services/api/getMajors";
import { useEffect, useState } from "react"
import MajorCard from "./MajorCard";

export const Majors = () => {
    const [fetchedMajors, setFetchedMajors] = useState<string[] | null>(null);

    const [title, setTitle] = useState<string>("Holis");
    const [showTitle, setShowTitle] = useState<boolean>(true);

    useEffect(() => {
        const fetchingMajors = async () => {
            try {
                const data = await fetchMajors();
                setFetchedMajors(data);
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        }
        
        fetchingMajors();
    }, [])

    function handleTitle() {
        setTitle("Holis wachos");
        setShowTitle(!showTitle);
    }

    return <div className="flex flex-col items-center bg-primaryWhite py-10 text-primaryBlack gap-6">
        {/* {showTitle && <h1>{title}</h1>}
        <button onClick={() => handleTitle()}>Clickeame esta</button> */}
        <h1 className="uppercase text-5xl pb-4">Carreras</h1>
        <MajorCard />
        <MajorCard />
        <MajorCard />
        <MajorCard />
    </div>
}