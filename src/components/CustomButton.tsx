import { CustomButtonType } from "@/helpers/interfacesAndTypes";

function CustomButton(props: CustomButtonType) {
    const { title } = props;

    return <div className="text-primaryBlack">
     {title}
    </div>

}

export default CustomButton;