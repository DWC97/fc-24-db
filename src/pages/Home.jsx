import { NewsModule } from "../components/NewsModule"
import { useState } from "react"
import { Link } from "react-router-dom"

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

export function Home({ players }){

    const [value, setValue] = useState("")
    const playerList = players

    function onSearch(player){
        setValue(player)
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <div className="mt-28">
                <img src="assets/logos/main.png" className="w-72"/>
            </div>
            <div className="text-custom-maroon text-2xl font-semibold tracking-widest py-8 px-8 text-center">
                THE ULTIMATE PLAYER DATABASE
            </div>
            <div className="pb-12">
                <input type="text" placeholder="Search player name..." className="border border-custom-grey py-2 rounded-lg text-center text-custom-grey px-12 md:px-24" value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
            {playerList.filter(item => {
                return value && item.long_name.toLowerCase().includes(value.toLowerCase()) && value.toLowerCase() !== item.long_name.toLowerCase()
            }).slice(0,10)
            .map(item => {
                return <div key={item.player_id} onClick={() => {
                    onSearch(item.short_name)
                }}><Link to={`/player/${item.short_name}`}>{`${item.short_name} - ${item.overall}`}</Link></div>
            })}
            </div>
            <div className="hidden md:flex flex-row pb-8">
               {newsPosters.map(item => {
                return <NewsModule key={item.id} {...item} />
               })}
            </div>
            <div className="text-xs text-custom-grey px-8 text-center">
                Please note this is not a commercial product and is only hosted as part of a web development portfolio.
            </div>
        </div>
    )
}