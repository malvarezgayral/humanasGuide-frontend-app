"use client"

import { fetchMajors } from "@/services/api/getMajors";
import { useEffect, useState } from "react"
import MajorCard from "./MajorCard";

export const Majors = () => {
    const [fetchedMajors, setFetchedMajors] = useState<any[]>();

    useEffect(() => {
        const fetchingMajors = async () => {
            try {
                const data = await fetchMajors();
                console.log(data);
                setFetchedMajors(data);
            } catch (error) {
                console.error("Error fetching majors:", error);
            }
        }
        
        fetchingMajors();
    }, [])

    return <div className="flex flex-col items-center bg-primaryWhite py-10 text-primaryBlack gap-6">
        <h1 className="uppercase text-5xl pb-4">Carreras</h1>
        {fetchedMajors && fetchedMajors.length > 0 && 
            fetchedMajors.map((major) => (
                <MajorCard key={major.id}
                    majorName={major.name}
                    officialPageLink={major.officialPage}   
                />
            )) 
        }
    </div>
}