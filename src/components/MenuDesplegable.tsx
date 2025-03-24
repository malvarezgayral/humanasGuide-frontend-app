"use client"

import { Box } from "@mui/material"

export default function MenuDesplegable() {

    return <div className="w-full flex flex-row justify-around items-center py-2 border-t-2">
        <a className="text-xl" href="/majors">Carreras</a>
        <a className="text-xl" href="">Buscar aportes</a>
        <a className="text-xl" href="/upload">Subir aportes</a>
    </div>

}