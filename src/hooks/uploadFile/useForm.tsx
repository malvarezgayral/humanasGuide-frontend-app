import { useEffect, useState } from "react";

export const useForm = () => {
    const [pickedMajorValue, setPickedMajorValue] = useState({
        anio_inicio: 0,
        id: 0,
        name: "",
        officialPage: ""
    });
    const [pickedSubjectValue, setPickedSubjectValue] = useState({
        id: 0,
        majorIds: [],
        name: "",
        quarter: 0,
        year: 0
    });
    const [pickedTypeValue, setPickedTypeValue] = useState<String>("");
    const [pickedYearValue, setPickedYearValue] = useState<Number>(0);
    const [pickedMonthValue, setPickedMonthValue] = useState<String>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validField, setValidField] = useState({
        monthValid: false,
        yearValid: false,
        formValid: false,
    })

    useEffect(() => {
        const monthValid = (pickedMonthValue && pickedTypeValue === "FINAL") || (!pickedMonthValue && pickedTypeValue !== "FINAL");

        const yearValid = (pickedYearValue && pickedTypeValue !== "RESUMEN") || (!pickedYearValue && pickedTypeValue === "RESUMEN");

        const formValid = !!selectedFile && pickedMajorValue.id !== 0 && pickedSubjectValue.id !== 0 && pickedTypeValue !== "" && monthValid && yearValid;

        setValidField({
            monthValid, yearValid, formValid,
        });
    }, [pickedMonthValue, pickedTypeValue, pickedYearValue, selectedFile, pickedMajorValue, pickedSubjectValue]);

    return {
        pickedMajorValue, setPickedMajorValue, pickedSubjectValue, setPickedSubjectValue,
        pickedTypeValue, setPickedTypeValue, pickedYearValue, setPickedYearValue, pickedMonthValue, setPickedMonthValue,
        selectedFile, setSelectedFile, errorMessage, setErrorMessage, isFormValid: validField.formValid
    }
}