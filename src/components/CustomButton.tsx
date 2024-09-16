import { CustomButtonType } from "@/constants/interfacesAndTypes";
import { BtnPrimaryOrange } from "@/theme/sx";
import { Button } from "@mui/material";
/* import { PrimaryOrangeBtn } from "@/theme/styledMUI"; */

function CustomButton(props: CustomButtonType) {
    const { title } = props;

    return <Button sx={BtnPrimaryOrange}>{title}</Button>
    

}

export default CustomButton;