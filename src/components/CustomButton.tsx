import { CustomButtonType } from "@/constants/interfacesAndTypes";
import { BtnPrimaryOrange } from "@/theme/sx";
import { Button } from "@mui/material";
/* import { PrimaryOrangeBtn } from "@/theme/styledMUI"; */

function CustomButton(props: CustomButtonType) {
    const { title, handleEventClick } = props;

    return <Button onClick={handleEventClick} sx={BtnPrimaryOrange}>{title}</Button>
    

}

export default CustomButton;