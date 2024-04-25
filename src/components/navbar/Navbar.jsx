// hooks
import { useEffect, useState } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"
import useBodyLockScroll from "../../hooks/useBodyLockScroll"
import { usePlayers } from "../../context/PlayersContext"
import useMobileView from "../../hooks/useMobileView"

// components
import { NavbarSearch } from "./NavbarSearch"

// data
import leagueData from "../../data/leagues.json"

// routing 
import { Link, NavLink, useMatch } from "react-router-dom"

// assets 
import { Icon } from '@iconify/react'
import navLogo from "./nav.png"


export function Navbar() {

    const players = usePlayers() // import player list
    const [nav, setNav] = useState(false) // set mobile nav menu
    const [value, setValue] = useState("") // set search input
    const [open, setOpen] = useState(false)  // set search list visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false) // set league dropdown menu visibility
    const [isShrunk, setIsShrunk] = useState(false) // set height of navbar based on scroll distance from top
    const isLeaguesActive = useMatch('/leagues/:id') // setting active nav link
    const [leaguesClicked, setLeaguesClicked] = useState(false) // set mobile menu league dropdown visibility
    const [toggle] = useBodyLockScroll() // toggle scroll lock 
    const isMobileView = useMobileView();

    // set mobile menu to false when viewport is large
    useEffect(() => {
        if (!nav) return
        if (!isMobileView) {
            setNav(!nav)
            toggle()
        }
    }, [isMobileView])

    // close search dropdown when user clicks outside of it
    let domNode = useClickOutside(() => {
        setOpen(false)
    })

    // managing league dropdown menu visibility
    function handleMouseEnter() {
        setDropdownVisible(true)
    }

    function handleMouseLeave() {
        setDropdownVisible(false)
    }

    // managing navbar height based on scroll position
    function scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            setIsShrunk(true)
        }
        else {
            setIsShrunk(false)
        }
    }
    window.onscroll = function () { scrollFunction() }

    return (
        <div className={`w-full bg-custom-grey ${isShrunk ? "h-16" : "h-20"} flex fixed justify-between z-50 ease-in-out duration-300`}>

            {/* navbar tabs */}
            <div className="flex">

                <div className="flex w-32 xl:w-48 items-center justify-center h-full ease-in-out duration-300 hover:bg-custom-black  active:bg-custom-maroon">
                    <NavLink to={"/"} className="h-full w-full flex justify-center items-center" aria-label="home logo">
                        <img src={navLogo} alt="logo" className={`${isShrunk ? "w-10" : "w-12"} ease-in-out duration-300`} />
                    </NavLink>
                </div>
                <ul className="hidden md:flex flex-row relative">
                    <li className="text-white w-32 xl:w-48 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 active:bg-custom-maroon hover:bg-custom-black">
                        <NavLink to={"/players"} className="h-full w-full flex justify-center items-center">
                            Players
                        </NavLink>
                    </li>

                    <li className="text-white w-32 xl:w-48 h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ backgroundColor: isLeaguesActive ? "#950206" : isDropdownVisible && "#1C1E1D" }}
                    >
                        Leagues
                    </li>
                    <li className={`absolute ${isShrunk ? "top-16" : "top-20"} left-32 xl:left-48  w-32 xl:w-48 `} onMouseEnter={handleMouseEnter}
                        onFocus={handleMouseEnter}
                        onBlur={handleMouseLeave}
                        onMouseLeave={handleMouseLeave}
                        tabIndex={0}>
                        {isDropdownVisible && leagueData.leagues.map(league => {
                            return <Link to={`/leagues/${league.name}`} key={league.name}><div className="bg-custom-black text-white text-xs text-center py-2 opacity-95 hover:bg-custom-maroon hover:text-white border-b border-custom-grey hover:border-custom-maroon"
                                onClick={() => handleMouseLeave()}
                            >
                                {league.name}
                            </div></Link>
                        })}
                    </li>
                    <li className="text-white w-32 xl:w-48  h-full flex items-center justify-center font-medium text-sm ease-in-out duration-300 hover:bg-custom-black">
                        <NavLink to={"/nations"} className="h-full w-full flex justify-center items-center">
                            Nations
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* navbar search */}
            <div className="w-48 xl:w-64 2xl:w-80 mr-8 hidden md:flex items-center justify-center relative" onClick={() => {
                setOpen(true)
            }}>
                {/* input bar */}
                <input type="text" placeholder="Search player name..." className="bg-custom-black px-4 py-3 text-xs text-left w-48 xl:w-64 2xl:w-80 text-white rounded font-medium outline-none" value={value} onChange={(e) => {
                    setValue(e.target.value)
                }} />
                <div className="absolute right-1">
                    {value === "" ? <Icon icon="material-symbols-light:search" color="white" width="25" /> : <div className="cursor-pointer hover:opacity-80 ease-in-out duration-300" onClick={() => {
                        setValue("")
                    }}><Icon icon="ph:x-thin" color="white" width="25" /></div>}
                </div>

                {/* players dropdown */}
                <div ref={domNode} className="absolute w-48 xl:w-64 2xl:w-80 z-100 h-44 overflow-y-auto top-16 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-900">
                    {open && players.filter(item => {
                        const searchWords = value.toLowerCase().split(' ')
                        return value && searchWords.every(word => (
                            item.long_name.toLowerCase().includes(word)
                        ))
                    }).slice(0, 100)
                        .map(player => {
                            return <NavbarSearch setValue={setValue} key={player.player_id} {...player} />
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
                    <NavLink to={"/"} aria-label="home logo">
                        <img src={navLogo} alt="logo" className="w-28" onClick={() => {
                            setNav(!nav)
                            toggle()
                        }} />
                    </NavLink>
                </div>
                <ul className="text-white w-full text-left px-12 pt-4">
                    <li className="pb-4 pt-4 border-b border-gray-100 text-md" >
                        <Link to={"/"} onClick={() => {
                            setNav(!nav)
                            toggle()
                        }}>
                            SEARCH
                        </Link>
                    </li>
                    <li className="pb-4 pt-4 border-b border-gray-100 text-md" >
                        <Link to={"players"} onClick={() => {
                            setNav(!nav)
                            toggle()
                        }}>
                            PLAYERS
                        </Link>
                    </li>
                    <li className={`pb-2 pt-4 ${leaguesClicked ? "border-none" : "border-b"} border-gray-100 text-md  `} >
                        <span className="cursor-pointer" onClick={() => {
                            setLeaguesClicked(!leaguesClicked)
                        }}>LEAGUES</span>
                    </li>
                    <li className={`${leaguesClicked ? "flex flex-col" : "hidden"} border-b border-gray-100 pb-4`}>
                        {leagueData.leagues.map(league => {
                            return (
                                <Link to={`/leagues/${league.name}`} key={league.name}><div className="py-2 font-light flex flex-row items-center relative text-sm"
                                    onClick={() => {
                                        setNav(!nav)
                                        setLeaguesClicked(false)
                                        toggle()
                                    }}>
                                    <img src={league.url} alt="league logo" className="h-6" />
                                    <span className="left-10 absolute">{league.name}</span>
                                </div></Link>
                            )
                        })}
                    </li>
                    <li className="pb-4 pt-4 border-b border-gray-100 text-md" >
                        <Link to={"nations"} onClick={() => {
                            setNav(!nav)
                            toggle()
                        }}>
                            NATIONS
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}