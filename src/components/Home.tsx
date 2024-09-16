import CustomButton from "./CustomButton";
import MajorSelection from "./MajorSelection";
import SubjectSelection from "./SubjectSelection";

function HomeComp() {
    return <div className="h-full w-full bg-primaryWhite py-8">
        <MajorSelection />
        <SubjectSelection />

        <div className="flex flex-row justify-around">
            <CustomButton title='Buscar aportes' />
            <CustomButton title='Subir aporte' />
        </div>

    </div>
}

export default HomeComp;