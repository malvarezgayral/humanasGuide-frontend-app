import { getAphorism } from "@/services/api/getAIAphorism";
import { useEffect, useState } from "react";

interface AphObject {
    autor: String;
    aphorism: String
}

function AphorismsBoxGenerator(){
    const [aphorism, setAphorism] = useState<AphObject>();
    const [bool, setBool] = useState<boolean>(false)

    useEffect(() => {
        const fetchingAph = async () => {
            try {
                const data = await getAphorism();
                setAphorism(data);
            } catch (error) {
                console.error("Error fetching aph:", error);
            }
        };
        fetchingAph();

        const timer = setInterval(() => {
            setBool(!bool)
        }, 9000)

        return () => {
            console.log('unmounting');
            clearInterval(timer);
        };
    }, [bool])
    
    return <div className="w-1/4 bg-primaryOrange rounded-xl p-2">
        {aphorism ? (
            <>
                <p>{aphorism.autor}:</p>
                <p>{aphorism.aphorism}</p>
            </>
        ) : (
            <p>Loading...</p> // Puedes mostrar un mensaje de carga mientras se obtiene el dato.
        )}
    </div>
}

export default AphorismsBoxGenerator;