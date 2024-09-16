import { InputLabel, NativeSelect } from "@mui/material";

function SubjectSelection() {
    const subjects = [
        { value: 'historia_general_social', label: 'Historia social general' },
        { value: 'introd_economia', label: 'Introducción a la economía' },
        { value: 'introd_sociologia', label: 'Introducción a la sociología' }
    ];

    return <div>
        {/* <h1 className="text-black">Selecciona la catedra</h1> */}
        <InputLabel htmlFor="pick-Subject" id="pickSubject-label">Selecciona la cátedra</InputLabel>
        <NativeSelect
            placeholder="Selecciona la catedra"
            inputProps={{
                name: 'Selecciona la catedra',
                id: 'pick-Subject',
            }}
        >
            {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                    {subject.label}
                </option>
            ))}
        </NativeSelect>
    </div>

}

export default SubjectSelection;