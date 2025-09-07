import { fetchFileTypes, fetchMonths } from "@/services/api/getFiles";
import { fetchMajors } from "@/services/api/getMajors";
import { getAllSubjectsBy, getYearsBySubject } from "@/services/api/getSubjects";
import { useEffect, useState } from "react";

export const useUploadService = () => {
    const [fileFields, setFileFields] = useState({
        carreras: [],
        catedras: [],
        types: [],
        years: [],
        meses: []
    });
    const [isLoading, setIsLoading] = useState<boolean>()

    useEffect(() => {
        // Fetch data from API
        const fetchingData = async () => {
            try {
                setIsLoading(true)
                Promise.all([fetchMajors(), fetchFileTypes(), fetchMonths()]).then((values) => {
                    const majors = values[0]
                    const typeFiles = values[1]
                    const months = values[2]
                    setFileFields(prev => ({ ...prev, carreras: majors }));
                    setFileFields(prev => ({ ...prev, types: typeFiles }));
                    setFileFields(prev => ({ ...prev, meses: months }));
                })
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };

        fetchingData()
    }, []);

    

    const fetchSubjects = async (Majorid: number) => {
        const subjects = await getAllSubjectsBy(Majorid)
        setFileFields(prev => ({ ...prev, catedras: subjects }));
    }


    const fetchSubjectYears = async (Subjectid: number) => {
        const years = await getYearsBySubject(Subjectid)
        setFileFields(prev => ({ ...prev, years: years }));
    }

    return {
        carreras: fileFields.carreras, catedras: fileFields.catedras, years: fileFields.years,
        types: fileFields.types, months: fileFields.meses, fetchSubjects, fetchSubjectYears, isLoading
    }

    /* useEffect(() => {
        if (pickedTypeValue === "FINAL") {
            const getMonths = async () => {
                const months = await fetchMonths();
                setMonths(months);
            };
 
            getMonths();
 
        } else {
            setPickedMonthValue("");
            setMonths([]);
            if (pickedTypeValue === "RESUMEN") {
                setPickedYearValue(0);
                setYears([]);
            }
        }
 
    }, [pickedTypeValue]) */
}