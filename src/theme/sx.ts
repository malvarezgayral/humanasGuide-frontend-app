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