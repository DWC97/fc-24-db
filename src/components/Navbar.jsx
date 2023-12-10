import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState } from "react";

export function Navbar(){

    const [nav, setNav] = useState(false)

    function handleNav(){
        setNav(!nav)
    }

    return (
        <div className="w-full bg-custom-grey h-20 flex fixed justify-between z-50">
            <div className="flex">
                <NavLink to={"/"}>
                    <div className="hidden md:flex w-32 items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-maroon/[.3]">
                        <img src="assets/logos/nav.png" className="w-12"/>
                    </div>
                </NavLink>
                <div className="w-32 flex items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-maroon/[.3] md:hidden">
                    <img src="assets/logos/nav.png" className="w-12"/>
                </div>
                <ul className="hidden md:flex flex-row ">
                    <NavLink to={"/players"}>
                        <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-maroon/[.3]">
                            Players
                        </li>
                    </NavLink>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-maroon/[.3]">
                        Nations
                    </li>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-maroon/[.3]">
                        Clubs
                    </li>
                </ul>
            </div>
            
            <div className="w-96 mr-8 hidden md:flex items-center justify-center relative">
                <input type="text" placeholder="Search player name..." className="bg-custom-black px-4 py-3 text-xs text-left w-96 text-white rounded"/>
                <div className="absolute right-1">
                    <Icon icon="material-symbols-light:search" color="white" width="25"/>
                </div>
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