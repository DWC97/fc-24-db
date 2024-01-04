import { useParams } from "react-router-dom"
import leagueData from "../data/leagues.json"
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';
import { useState } from "react";

export function League(){

    const { id } = useParams()
    const league = leagueData.leagues.find(league => league.name === id)
    console.log(league.color)

    const [hoveredClub, setHoveredClub] = useState(null)

    function bgGenerator(color){
        const randcolor = "hover:bg-[#0057B8]"
        console.log(color)
        // return `hover:bg-[${randcolor}]`
        return color
    }

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className={`flex flex-row items-center mt-32  h-16 md:h-24`}
            style={{backgroundColor: `${league.color}`}}>
                <img src={league.url} className="w-10 md:w-12 mx-4 md:mx-8"/>
                <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">{league.name.toUpperCase()}</h1>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8 mb-4">
                {league.clubs.map((club, index) => {
                    return (
                    <Link to={`/clubs/${club.name}`}>
                        <div key={index} className={`flex flex-col justify-between  border-b-2 border-custom-grey rounded-3xl text-custom-grey hover:text-white h-44 hover:scale-110 ease-in-out duration-300`}     
                        style={{
                            backgroundColor: hoveredClub === index ? `${club.color}` : "#f5f5f5",
                            borderColor: `${club.color}`
                        }}
                        onMouseOver={() => setHoveredClub(index)}
                        onMouseLeave={() => setHoveredClub(null)}
                        >
                            <img src={club.url} className="w-28 pt-3 pl-3"/>
                            <div className="flex flex-row pb-2 items-center justify-between">
                                <span className={`pl-6 tracking-widest font-semibold`}
                                style={{color: hoveredClub === index ? "white" : `${club.color}`}}
                                >{club.name.toUpperCase()}</span>
                                <div className="mr-6">
                                    <Icon icon="cil:arrow-right" color={hoveredClub === index ? `white` : `${club.color}`} />
                                </div>
                            </div>
                        </div>
                    </Link>
                    )
                })}
            </div>
            
        </div>
    )
}