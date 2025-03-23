import { blueGrey, red } from "@mui/material/colors";
import { primaryOrange, whiteInnerText } from "./theme";

export const BtnPrimaryOrange = {
    color: whiteInnerText,
    backgroundColor: primaryOrange,
    borderRadius: '0.6rem',
    padding: '10px',
    textTransform: 'none',
    fontSize: '1rem',
    '&:hover': {
        color: 'red',
        backgroundColor: 'white',
    },
}

export const NativeSelectPrimary = {
    color: blueGrey,
    backgroundColor: red,
    borderRadius: '0.6rem',
    padding: '2px',
    width: '12rem'
}

export const InputLabelPrimary = {
    color: blueGrey,
    textColor: blueGrey,
    fontSize: '0.8rem'
}