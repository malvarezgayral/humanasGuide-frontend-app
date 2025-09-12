import { InputLabelPrimary, NativeSelectPrimary } from "@/theme/sx";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

interface CustomSelectionProps {
    setPickedValue: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    name?: string;
    id: number | string | undefined;
    iterableOptions?: unknown[];
    title: string;
    disable?: boolean;
    errorMessage?: string | null;
}

function CustomSelection(props: CustomSelectionProps) {
    const { setPickedValue, name, id, iterableOptions, title, disable, errorMessage } = props;

    /* const transformToName = (value: string | Number) => {
        if (typeof value !== "string") {
            return value.toString();
        }

        return value
            .replace(/[_-]/g, " ") // Reemplazar guiones bajos y guiones por espacios
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizar cada palabra
    }; */
    console.log("errorMessage: ", errorMessage)
    console.log("id:", id)
    console.log("disable:", disable)

    return <div className="py-5 w-[200px]">
        <FormControl>
            <InputLabel htmlFor="pick-v" id="pickV-label" sx={InputLabelPrimary}>Selecciona tu {title}</InputLabel>
            <NativeSelect
                disabled={disable}
                error={id === 0}
                onError={() => "Por favor, selecciona una opción válida"}
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
            {errorMessage && !disable && !id && <p className="text-red-500 mt-2">Por favor, selecciona una opción válida en {title}</p>}
        </FormControl>
    </div>

}

export default CustomSelection;