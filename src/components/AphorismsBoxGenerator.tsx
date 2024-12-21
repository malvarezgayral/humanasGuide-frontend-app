import { getAphorism } from "@/services/api/getAIAphorism";
import { useEffect, useState } from "react";

function AphorismsBoxGenerator(){
    const [aphorism, setAphorism] = useState('');
    const [bool, setBool] = useState(false)

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
    
    return <div className="w-1/4 bg-black rounded-xl p-2">
        <p>{aphorism.autor}:</p>
        <p>"{aphorism.aphorism}"</p>
    </div>
}

export default AphorismsBoxGenerator;