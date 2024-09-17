import { FormControl, InputLabel, NativeSelect } from "@mui/material";

function CustomSelection(props: any) {
    const { setPickedValue, pickedValue, iterableOptions, title } = props;

    return <div className="py-5">
        <FormControl>
            <InputLabel htmlFor="pick-v" id="pickV-label">Selecciona tu {title}</InputLabel>
            <NativeSelect
                placeholder={`Selecciona tu ${title}`}
                inputProps={{
                    name: `Selecciona tu ${title}`,
                    id: 'pick-v',
                }}
                value={pickedValue}
                onChange={setPickedValue}
            >
                <option style={{ display: 'none' }} key="" value=""></option>
                {iterableOptions.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>

    </div>

}

export default CustomSelection;