"use client"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import MenuDesplegable from './MenuDesplegable';

function Header(){
    const [rotated, setRotated] = useState(false);
    const [isVisible, setVisible] = useState(false);

    const handleClick = () => {
      setRotated((prev) => !prev);
    };

return <div className="min-h-12 w-full bg-primaryOrange">
    <div className="flex flex-row justify-between items-center">
        <ExpandMoreIcon onClick={handleClick} sx={{ 
                            fontSize: 60, 
                            mx: 2,
                            transition: "transform 0.3s ease",
                            transform: rotated ? "rotate(180deg)" : "rotate(0deg)", }} />
        <p className="uppercase text-4xl font-bold p-4 text-right"><a href="/">la guía del pueblo</a></p>
    </div>
    
    {rotated && <MenuDesplegable />}
</div>
}

export default Header;