import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

interface dropDownForm {
    formData: any,
    handleChange: any,
    iterableOptions: any,
    formOptions: any
}

export const DropdownForm = ({formData, handleChange, iterableOptions, formOptions}: dropDownForm) => {

    return <FormControl fullWidth>
        <InputLabel id="dropdown1-label">Dropdown 1</InputLabel>
        <Select
            labelId={formOptions.label + formOptions.id}
            id={formOptions.id}
            name={formOptions.name}
            value={formData.dropdown1}
            onChange={handleChange}
            label={formOptions.label}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {iterableOptions.map((option: any) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
        </Select>
    </FormControl>
    }