import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState } from "react";

export function Navbar(){

    const [nav, setNav] = useState(false)

    function handleNav(){
        setNav(!nav)
    }

    return (
        <div className="w-full bg-custom-grey h-20 flex fixed justify-between">
            <div className="flex ">
                <NavLink to={"/"}>
                    <div className="w-32 flex items-center justify-center h-full">
                        <img src="assets/logos/nav.png" className="w-12"/>
                    </div>
                </NavLink>
                <ul className="hidden md:flex flex-row ">
                    <NavLink to={"/players"}>
                        <li className="text-white w-32 h-full flex items-center justify-center font-medium">
                            Players
                        </li>
                    </NavLink>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium">
                        Nations
                    </li>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium">
                        Clubs
                    </li>
                </ul>
            </div>
            
            <div className="w-32 hidden md:flex items-center justify-center mr-0">
                <Icon icon="material-symbols:search" color="white" width="30"/>
            </div> 
            <div className="w-32 flex md:hidden items-center justify-center mr-0">
                <Icon icon="pajamas:hamburger" color="white" width="25" />
            </div> 
        </div>
    )
}