"use client"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import MenuDesplegable from './MenuDesplegable';
import { useAphorism } from '@/hooks/useAphorism';

function Header(){
    const [rotated, setRotated] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const { aphorism, setAphorism, getNewAphorism } = useAphorism();

    const handleClick = () => {
      if (!rotated) getNewAphorism()
      setRotated((prev) => {
        setAphorism(null);
        return !prev});
    };

return <div className="min-h-12 w-full bg-primaryOrange">
    <div className="flex flex-row justify-between items-center">
        <ExpandMoreIcon onClick={handleClick} sx={{ 
                            cursor: "pointer",
                            fontSize: 60, 
                            mx: 2,
                            transition: "transform 0.3s ease",
                            transform: rotated ? "rotate(180deg)" : "rotate(0deg)", }} />
        <p className="uppercase text-4xl font-bold p-4 text-right"><a href="/">la guía del pueblo</a></p>
    </div>
    
    {rotated && <MenuDesplegable />}
    {rotated && !aphorism && <p className="uppercase text-[0.7rem] font-bold p-4 text-left typing-aphorism h-2 max-h-2">Aqui viene tu aforismo! ¿De quien sera? Podria ser cualquier filosofo...</p>}
    {rotated && aphorism && <p className="uppercase text-[0.7rem] font-bold p-4 text-left typing-aphorism h-2 max-h-2">{aphorism?.author + ':'} {aphorism?.aphorism}</p>}
</div>
}

export default Header;