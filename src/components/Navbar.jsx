import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from "react";
import { PlayerSearch } from "./PlayerSearch";
import { NavbarSearch } from "./NavbarSearch";
import { useClickOutside } from "../hooks/useClickOutside";
import leagueData from "../data/leagues.json"

export function Navbar({ players }){

    const [nav, setNav] = useState(false)
    const [value, setValue] = useState("")
    const [open, setOpen] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const playerList = players

    let domNode = useClickOutside(() => {
        setOpen(false)
    })
    
    function handleNav(){
        setNav(!nav)
    }

    function handleMouseEnter(){
        setDropdownVisible(true)
        console.log("entered")
    }

    function handleMouseLeave(){
        setDropdownVisible(false)
        console.log("left")
    }

    return (
        <div className="w-full bg-custom-grey h-20 flex fixed justify-between z-50">
            <div className="flex">
                <NavLink to={"/"}>
                    <div className="hidden md:flex w-32 items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-black">
                        <img src="assets/logos/nav.png" className="w-12"/>
                    </div>
                </NavLink>
                <div className="w-32 flex items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-black md:hidden">
                    <img src="assets/logos/nav.png" className="w-12"/>
                </div>
                <ul className="hidden md:flex flex-row relative">
                    <NavLink to={"/players"}>
                        <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-black">
                            Players
                        </li>
                    </NavLink>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-black" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{backgroundColor: isDropdownVisible && "#1C1E1D"}}
                    >
                        Leagues
                    </li>
                    <div className="absolute top-20 left-32 w-32" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        {isDropdownVisible && leagueData.leagues.map(league => {
                            return <NavLink to={`/leagues/${league.name}`} key={league.name}><div className="bg-custom-black text-white text-xs text-center py-2 opacity-95 hover:bg-custom-maroon hover:text-white border-b border-custom-grey hover:border-custom-maroon">{league.name}</div></NavLink>
                        })}
                    </div>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-black">
                        Nations
                    </li>
                </ul>
            </div>
            
            <div className="w-48 mr-8 hidden md:flex items-center justify-center relative" onClick={() => {
                setOpen(true)
            }}>
                <input type="text" placeholder="Search player name..." className="bg-custom-black px-4 py-3 text-xs text-left w-48 text-white rounded font-medium" value={value} onChange={(e) => {
                setValue(e.target.value)}}/>
                <div className="absolute right-1">
                    {value === "" ? <Icon icon="material-symbols-light:search" color="white" width="25"/> : <div className="cursor-pointer" onClick={() => {
                        setValue("")
                    }}><Icon icon="ph:x-thin" color="white" width="25" /></div>}
                </div>
                <div ref={domNode} className="absolute w-48 z-100 h-44 overflow-y-auto top-16 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-900">
                    {open && playerList.filter(item => {
                        return value && item.long_name.toLowerCase().includes(value.toLowerCase()) && value.toLowerCase() !== item.long_name.toLowerCase()
                    }).slice(0,100)
                    .map(item => {
                        return <NavbarSearch setValue={setValue}  key={item.player_id} {...item}/>
                    })}
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
                        LEAGUES
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