import { FormControl, InputLabel, NativeSelect } from "@mui/material";

function CustomSelection(props: any) {
    const { setPickedValue, pickedValue, iterableOptions, title } = props;

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
                    <option key={opt.name} value={opt.id || opt.value}>
                        {transformToName(opt.name || opt.value)}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    </div>

}

export default CustomSelection;