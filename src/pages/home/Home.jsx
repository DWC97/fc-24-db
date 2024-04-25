// hooks
import { useState } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"
import { usePlayers } from "../../context/PlayersContext"

// components
import { NewsModule } from "./NewsModule"
import { HomeSearch } from "./HomeSearch"

// assets
import { Icon } from '@iconify/react'

// example content for posters
const newsPosters = [
    {
        "id": 1,
        "imageSrc": "assets/images/rice.jpeg",
        "desc": "GUNNERS' NEW SUPERMAN",
        "url": "https://www.youtube.com/watch?v=2fqgT6sF3Jw"
    },
    {
        "id": 2,
        "imageSrc": "assets/images/haaland.jpg",
        "desc": "HAALAND LEFT FURIOUS",
        "url": "https://www.telegraph.co.uk/football/2023/12/04/erling-haaland-fa-investigation-referee-abuse-man-city/"
    },
    {
        "id": 3,
        "imageSrc": "assets/images/champions.jpg",
        "desc": "MATCHDAY 5 RESULTS",
        "url": "https://en.as.com/resultados/futbol/champions/2021_2022/jornada/grupos_a_5/"
    }
]


export function Home() {

    const players = usePlayers() // import player list
    const [value, setValue] = useState("") // set search input
    const [open, setOpen] = useState(false) // set search list visibility

    // close search dropdown when user clicks outside of it
    let domNode = useClickOutside(() => {
        setOpen(false)
    })

    return (
        <div className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">

            {/* content */}
            <div className="mt-28">
                <img src="assets/logos/main.png" alt="big logo" className="w-72 2xl:w-96" />
            </div>
            <h1 className="text-custom-maroon text-2xl 2xl:text-4xl font-semibold tracking-widest py-8 2xl:py-12 px-8 text-center">
                THE ULTIMATE PLAYER DATABASE
            </h1>

            {/* searchbar */}
            <div className="pb-12 relative" onClick={() => {
                setOpen(true)
            }}>
                {/* search input */}
                <input type="text" placeholder="Search player name..." className="border-b-2 border-custom-grey py-2  text-center font-medium text-custom-grey w-72 md:w-96 outline-none" value={value} onChange={(e) => {
                    setValue(e.target.value)
                }} />
                <div className="absolute right-2 top-2">
                    {value === "" ? <Icon icon="material-symbols:search" color="#2c2e2d" width="25" /> : <div className="cursor-pointer hover:opacity-80 ease-in-out duration-300" onClick={() => {
                        setValue("")
                    }}><Icon icon="ph:x-bold" color="#2c2e2d" width="25" /></div>}
                </div>

                {/* players dropdown */}
                <div className="absolute z-10 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100 overflow-x-hidden" ref={domNode} >
                    {open && players.filter(item => {
                        const searchWords = value.toLowerCase().split(' ')
                        return value && searchWords.every(word => (
                            item.long_name.toLowerCase().includes(word)
                        ))
                    }).slice(0, 10)
                        .map(item => {
                            return <HomeSearch key={item.player_id} {...item} />
                        })}
                </div>

            </div>

            {/* bulletin board */}
            <div className="hidden md:flex flex-row pb-8">
                {newsPosters.map(item => {
                    return <NewsModule key={item.id} {...item} setValue={setValue} />
                })}
            </div>

            {/* disclaimer */}
            <div className="text-xs text-custom-grey px-8 text-center">
                Please note this is not a commercial product and is only hosted as part of a web development portfolio.
            </div>
        </div>
    )
}