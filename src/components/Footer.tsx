function Footer() {
    //le saqué max-h-60 al primer div
    return <div className="bg-primaryBlack">
        <div className="w-full flex justify-center items-center py-4">
            <div className="w-2/5 border-solid border-b-2 border-b-primaryOrange pb-2">
                <p className="uppercase text-xl font-bold text-center">la guía del pueblo</p>
            </div>
        </div>

        <div className="flex flex-col items-center py-3">
            <p className="font-bold text-lg pb-2">Mapa del sitio</p>
            <a href="">Carreras</a>
            <a href="">Buscar aportes</a>
            <a href="/upload">Subir aportes</a>
        </div>

        <div className="flex flex-col items-center py-3">
            <p className="font-bold text-lg pb-2">Links externos</p>
            <a href="">Link 1</a>
            <a href="">Link 2</a>
            <a href="">Link 3</a>
        </div>
    </div>
}

export default Footer;