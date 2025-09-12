import { InputLabelPrimary, NativeSelectPrimary } from "@/theme/sx";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

interface CustomSelectionProps {
    setPickedValue: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    name?: string;
    id: number | string | undefined;
    iterableOptions?: unknown[];
    title: string;
    disable?: boolean;
}

function CustomSelection(props: CustomSelectionProps) {
    const { setPickedValue, name, id, iterableOptions, title, disable } = props;

    /* const transformToName = (value: string | Number) => {
        if (typeof value !== "string") {
            return value.toString();
        }

        return value
            .replace(/[_-]/g, " ") // Reemplazar guiones bajos y guiones por espacios
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizar cada palabra
    }; */
    console.log(title)
    console.log(iterableOptions)

    return <div className="py-5 w-[200px]">
        <FormControl>
            <InputLabel htmlFor="pick-v" id="pickV-label" sx={InputLabelPrimary}>Selecciona tu {title}</InputLabel>
            <NativeSelect
                disabled={disable}
                error={name === ""}
                onErrorCapture={() => "Por favor, selecciona una opción válida."}
                placeholder={`Selecciona tu ${title}`}
                inputProps={{
                    name: `Selecciona tu ${title}`,
                    id: 'pick-v',
                }}
                sx={NativeSelectPrimary}
                value={id}
                onChange={setPickedValue}
            >
                <option style={{ display: 'none' }} key="" value=""></option>
                {(iterableOptions ?? []).map((opt: unknown, idx: number) => {
                    const key = (opt?.id ?? opt?.name ?? opt ?? idx) as string | number;
                    const value = (opt?.id ?? opt ?? '') as string | number;
                    const label = (opt?.name ?? opt ?? '').toString();
                    return <option key={key} value={value}>{label}</option>
                })}
            </NativeSelect>
        </FormControl>
    </div>

}

export default CustomSelection;