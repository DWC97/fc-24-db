// hooks
import { useState } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"
import useBodyLockScroll from "../../hooks/useBodyLockScroll"

// components
import { NavbarSearch } from "./NavbarSearch"

// data
import leagueData from "../../data/leagues.json"

// routing 
import { Link, NavLink, useMatch } from "react-router-dom"

// context
import { usePlayers } from "../../context/PlayersContext"

// assets 
import { Icon } from '@iconify/react'
import navLogo from "./nav.png"

export function Navbar(){

    const players = usePlayers() // import player list
    const [nav, setNav] = useState(false) // set mobile nav menu
    const [value, setValue] = useState("") // set search input
    const [open, setOpen] = useState(false)  // set search list visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false) // set league dropdown menu visibility
    const [isShrunk, setIsShrunk] = useState(false) // set height of navbar based on scroll distance from top
    const isLeaguesActive = useMatch('/leagues/:id') // setting active nav link
    const [leaguesClicked, setLeaguesClicked] = useState(false) // set mobile menu league dropdown visibility
    const [toggle] = useBodyLockScroll() // toggle scroll lock 

    // close search dropdown when user clicks outside of it
    let domNode = useClickOutside(() => {
        setOpen(false)
    })

    // managing league dropdown menu visibility
    function handleMouseEnter(){
        setDropdownVisible(true)
    }

    function handleMouseLeave(){
        setDropdownVisible(false)
    }
    
    // managing navbar height based on scroll position
    function scrollFunction(){
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            setIsShrunk(true)
        }
        else {
            setIsShrunk(false)
        }
    }
    window.onscroll = function() {scrollFunction()}

    return (
        <div className={`w-full bg-custom-grey ${isShrunk ? "h-16" : "h-20"} flex fixed justify-between z-50 ease-in-out duration-300`}>

            {/* navbar tabs */}
            <div className="flex">
                <NavLink to={"/"}>
                    <div className="hidden md:flex w-32 items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-black">
                        <img src={navLogo} className={`${isShrunk ? "w-10" : "w-12"} ease-in-out duration-300`}/>
                    </div>
                </NavLink>
                {/* mobile icon */}
                <NavLink to={"/"}><div className="w-32 flex items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-black md:hidden">
                    <img src={navLogo} className="w-12"/>
                </div></NavLink>
                <ul className="hidden md:flex flex-row relative">
                    <NavLink to={"/players"}>
                        <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 active:bg-custom-maroon hover:bg-custom-black">
                            Players
                        </li>
                    </NavLink>
                    <li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300" 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{backgroundColor: isLeaguesActive ? "#950206" : isDropdownVisible && "#1C1E1D"}}
                    >
                        Leagues
                    </li>
                    <div className={`absolute ${isShrunk ? "top-16" : "top-20"} left-32 w-32`} onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        {isDropdownVisible && leagueData.leagues.map(league => {
                            return <Link to={`/leagues/${league.name}`} key={league.name}><div className="bg-custom-black text-white text-xs text-center py-2 opacity-95 hover:bg-custom-maroon hover:text-white border-b border-custom-grey hover:border-custom-maroon"
                            onClick={() => handleMouseLeave()}
                            >
                                {league.name}
                            </div></Link>
                        })}
                    </div>
                    <NavLink to={"/nations"}><li className="text-white w-32 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-black">
                        Nations
                    </li></NavLink>
                </ul>
            </div>
            
            {/* navbar search */}
            <div className="w-48 mr-8 hidden md:flex items-center justify-center relative" onClick={() => {
                setOpen(true)
            }}>
                {/* input bar */}
                <input type="text" placeholder="Search player name..." className="bg-custom-black px-4 py-3 text-xs text-left w-48 text-white rounded font-medium outline-none" value={value} onChange={(e) => {
                setValue(e.target.value)}}/>
                <div className="absolute right-1">
                    {value === "" ? <Icon icon="material-symbols-light:search" color="white" width="25"/> : <div className="cursor-pointer" onClick={() => {
                        setValue("")
                    }}><Icon icon="ph:x-thin" color="white" width="25" /></div>}
                </div>

                {/* players dropdown */}
                <div ref={domNode} className="absolute w-48 z-100 h-44 overflow-y-auto top-16 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-900">
                    {open && players.filter(item => {
                        const searchWords = value.toLowerCase().split(' ')
                        return value && searchWords.every(word => (
                            item.long_name.toLowerCase().includes(word)
                        ))
                    }).slice(0,100)
                    .map(player => {
                        return <NavbarSearch setValue={setValue}  key={player.player_id} {...player}/>
                    })}
                </div>

            </div>

            {/* mobile navbar icon */} 
            <div className="w-32 flex md:hidden items-center justify-center mr-0 cursor-pointer z-50" onClick={() => {
                setLeaguesClicked()
                setNav(!nav)
                toggle()
            }}>
                {nav ? <Icon icon="ph:x-bold" color="white" width="30" /> : <Icon icon="pajamas:hamburger" color="white" width="25" />}
            </div>

            {/* mobile menu */}
            <div className={nav ? "fixed left-0 top-0 w-full h-full bg-custom-grey flex flex-col items-center ease-in-out duration-500" : "fixed top-[-100%]"}>
                <div className="mt-24">
                    <img src={navLogo} className="w-32"/>
                </div>
                <ul className="text-white w-full text-left px-12 pt-4">
                    <NavLink to={"/"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-md" onClick={() => {
                            setNav(!nav)
                            toggle()
                        }}>
                        SEARCH
                        </li>
                    </NavLink>
                    <NavLink to={"players"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-md" onClick={() => {
                            setNav(!nav)
                            toggle()
                        }}>
                        PLAYERS
                        </li>
                    </NavLink>
                    <li className={`pb-2 pt-4 ${leaguesClicked ? "border-none" : "border-b"} border-gray-100 text-md  cursor-pointer`} onClick={() => {
                        setLeaguesClicked(!leaguesClicked)
                    }}>
                    LEAGUES
                    </li>
                    <div className={`${leaguesClicked ? "flex flex-col" : "hidden"} border-b border-gray-100 pb-4`}>
                    {leagueData.leagues.map(league => {
                        return <Link to={`/leagues/${league.name}`} key={league.name}><div className="py-2 font-light flex flex-row items-center relative text-sm"
                        onClick={() => {
                            setNav(!nav)
                            setLeaguesClicked(false)
                            toggle()
                        }}>
                            <img src={league.url} className="h-6"/>
                            <span className="left-10 absolute">{league.name}</span>
                        </div></Link>
                        })}
                    </div>
                    <NavLink to={"nations"}>
                        <li className="pb-4 pt-4 border-b border-gray-100 text-md" onClick={() => {
                            setNav(!nav)
                            toggle()
                        }}>
                        NATIONS
                        </li>
                    </NavLink>
                </ul>
            </div>
            
        </div>
    )
}