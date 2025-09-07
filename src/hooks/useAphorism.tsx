import { getAphorism } from "@/services/api/getAIAphorism";
import { useEffect, useState } from "react";

interface AphObject {
    author: string;
    aphorism: string;
}

export function useAphorism(){
    const [aphorism, setAphorism] = useState<AphObject>();

    /*useEffect(() => {
        const fetchingAph = async () => {
            try {
                const data = await getAphorism();
                setAphorism(data);
            } catch (error) {
                console.error("Error fetching aph:", error);
            }
        };
        fetchingAph();
    }, [])*/

    const getNewAphorism = async () => {
        console.log('getting new aphorism');
        try {
            const data = await getAphorism();
            setAphorism(data);
        } catch (error) {
            console.error("Error fetching aph:", error);
        }
    }
    
    return { getNewAphorism, aphorism }
}