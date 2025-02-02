import { getAphorism } from "@/services/api/getAIAphorism";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface AphObject {
    autor: String;
    aphorism: String
}

function AphorismsBoxGenerator(){
    const [aphorism, setAphorism] = useState<AphObject>();

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

        return () => {
            /* console.log('unmounting'); */
        };
    }, [])

    const getNewAphorism = async () => {
        try {
            const data = await getAphorism();
            setAphorism(data);
        } catch (error) {
            console.error("Error fetching aph:", error);
        }
    }
    
    return <div className="w-1/4 bg-primaryOrange rounded-xl p-2 flex flex-col items-center">
        {aphorism ? (
            <>
                <p>{aphorism.autor}:</p>
                <p>{aphorism.aphorism}</p>
            </>
        ) : (
            <p>Loading...</p> // Puedes mostrar un mensaje de carga mientras se obtiene el dato.
        )}
        <Button onClick={() => getNewAphorism()}>Pidele a la IA un aforismo!</Button>
    </div>
}

export default AphorismsBoxGenerator;