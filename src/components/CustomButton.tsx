interface CustomButtonType {
    title: String
};

function CustomButton(props: CustomButtonType) {
    const { title } = props;

    return <div className="text-primaryBlack">
     {title}
    </div>

}

export default CustomButton;