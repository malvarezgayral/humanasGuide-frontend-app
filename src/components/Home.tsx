import CustomButton from "./CustomButton";
import MajorSelection from "./MajorSelection";
import SubjectSelection from "./SubjectSelection";

function HomeComp() {
    return <div className="h-full w-full bg-primaryWhite">
        <MajorSelection />
        <SubjectSelection />

        <div className="flex flex-row justify-around">
            <CustomButton title='buscar aportes' />
            <CustomButton title='subir aporte' />
        </div>

    </div>
}

export default HomeComp;