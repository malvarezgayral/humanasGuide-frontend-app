import { InputLabel, NativeSelect } from "@mui/material";

function MajorSelection() {
    const majors = [
        { value: 'historia', label: 'Historia' },
        { value: 'geografia', label: 'Geografía' },
        { value: 'rel_int', label: 'Relaciones internacionales' }
    ];

    return <div>
        {/* <h1 className="text-black">Selecciona tu carrera</h1> */}
        <InputLabel htmlFor="pick-major" id="pickMajor-label">Selecciona tu carrera</InputLabel>
        <NativeSelect
            placeholder="Selecciona tu carrera"
            inputProps={{
                name: 'Selecciona tu carrera',
                id: 'pick-major',
            }}
        >
            {majors.map((major) => (
                <option key={major.value} value={major.value}>
                    {major.label}
                </option>
            ))}
        </NativeSelect>
    </div>

}

export default MajorSelection;