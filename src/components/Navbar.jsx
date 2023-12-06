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
                        <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm">
                            Players
                        </li>
                    </NavLink>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm">
                        Nations
                    </li>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm">
                        Clubs
                    </li>
                </ul>
            </div>
            
            <div className="w-32 hidden md:flex items-center justify-center mr-0">
                <Icon icon="material-symbols:search" color="white" width="30"/>
            </div> 
            <div className="w-32 flex md:hidden items-center justify-center mr-0 cursor-pointer z-50" onClick={handleNav}>
                {nav ? <Icon icon="ph:x-bold" color="white" width="30" /> : <Icon icon="pajamas:hamburger" color="white" width="25" />}
            </div>
            <div className={nav ? "fixed left-0 top-0 w-full h-full bg-custom-grey flex flex-col items-center ease-in-out duration-500" : "fixed top-[-100%]"}>
                <div className="mt-32">
                    <img src="assets/logos/nav.png" className="w-44"/>
                </div>
                <ul className="text-white w-full text-left px-12 pt-16">
                    <NavLink to={"/"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-lg" onClick={handleNav}>
                        SEARCH
                        </li>
                    </NavLink>
                    <NavLink to={"/players"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-lg" onClick={handleNav}>
                        PLAYERS
                        </li>
                    </NavLink>
                    <NavLink to={"/"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-lg" onClick={handleNav}>
                        CLUBS
                        </li>
                    </NavLink>
                    <NavLink to={"/"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-lg" onClick={handleNav}>
                        NATIONS
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}