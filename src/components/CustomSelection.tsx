import { FormControl, InputLabel, NativeSelect } from "@mui/material";

interface CustomSelectionProps {
    setPickedValue: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    name: String;
    id: Number
    iterableOptions: any[];
    title: string;
    disable?: boolean;
}

function CustomSelection(props: CustomSelectionProps) {
    const { setPickedValue, name, id, iterableOptions, title, disable } = props;

    const transformToName = (value: string | Number) => {
        if (typeof value !== "string") {
            return value.toString();
        }

        return value
            .replace(/[_-]/g, " ") // Reemplazar guiones bajos y guiones por espacios
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizar cada palabra
    };

    return <div className="py-5">
        <FormControl>
            <InputLabel htmlFor="pick-v" id="pickV-label">Selecciona tu {title}</InputLabel>
            <NativeSelect
                disabled={disable}
                error={name === ""}
                onErrorCapture={() => "Por favor, selecciona una opción válida."}
                placeholder={`Selecciona tu ${title}`}
                inputProps={{
                    name: `Selecciona tu ${title}`,
                    id: 'pick-v',
                }}
                value={id}
                onChange={setPickedValue}
            >
                <option style={{ display: 'none' }} key="" value=""></option>
                {iterableOptions.map((opt: any) => {
                    console.log('opt: ', opt);
                    return <option key={opt.name || opt} value={opt.id}>
                    {opt.name || opt.value || opt}
                </option>
                })}
            </NativeSelect>
        </FormControl>
    </div>

}

export default CustomSelection;