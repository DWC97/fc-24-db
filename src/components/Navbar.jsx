import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';

export function Navbar(){
    return (
        <div className="w-full bg-custom-grey h-20 flex fixed justify-between">
            <div className="flex ">
                <NavLink to={"/"}>
                    <div className="w-32 flex items-center justify-center h-full">
                        <img src="assets/logos/nav.png" className="w-12"/>
                    </div>
                </NavLink>
                <ul className="flex flex-row">
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
            
            <div className="w-32 flex items-center justify-center mr-0">
                <Icon icon="material-symbols:search" color="white" width="30"/>
            </div> 
        </div>
    )
}