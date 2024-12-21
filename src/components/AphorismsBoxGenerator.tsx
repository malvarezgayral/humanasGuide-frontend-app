import { getAphorism } from "@/services/api/getAIAphorism";
import { useEffect, useState } from "react";

function AphorismsBoxGenerator(){
    const [aphorism, setAphorism] = useState('');
    const [bool, setBool] = useState(false)

    setInterval(() => {
        setBool(!bool)
    }, 24000)

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
    }, [bool])

    console.log(aphorism.autor)
    
    return <div className="w-1/4 bg-black rounded-xl p-2">
        <p>{aphorism.autor}:</p>
        <p>"{aphorism.aphorism}"</p>
    </div>
}

export default AphorismsBoxGenerator;