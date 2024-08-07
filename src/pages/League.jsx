// hooks
import { useState } from "react"
import { useParams } from "react-router-dom"

// components
import { NotFound } from "./NotFound"

// routing
import { Link } from "react-router-dom"

// data
import leagueData from "../data/leagues.json"

// assets
import { Icon } from '@iconify/react'



export function League() {

    const { id } = useParams() // access search param
    const league = leagueData.leagues.find(league => league.name === id) // find league in leagues data using search param (eg. Premier League)
    const [hoveredClub, setHoveredClub] = useState(null) // state for toggling bg for each club upon hover

    return (
        <div>
            {league ?
                <div className="w-full flex flex-col px-5 md:px-10 lg:px-20 xl:px-32 2xl:px-60">
                    <div className={`flex flex-row items-center mt-32  h-16 md:h-24`}
                        style={{ backgroundColor: `${league.color}` }}>
                        <img src={league.url} alt="league logo" className="h-12 md:h-16 mx-4 md:mx-8" />
                        <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">{league.name.toUpperCase()}</h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mb-4">
                        {/* rendering out each club for the respective league */}
                        {league.clubs.map((club, index) => {
                            return (
                                <Link to={`/clubs/${club.name}`} key={index} className="focus:outline-none focus:scale-105 ease-in-out duration-300" onFocus={() => setHoveredClub(index)}>
                                    <div className={`flex flex-col justify-between border-b-4 border-custom-grey rounded-3xl text-custom-grey hover:text-white h-36 md:h-44 hover:scale-105 ease-in-out duration-300`}
                                        // style changes upon hover using an inline style because tailwind can't handle dynamic vars
                                        style={{
                                            backgroundColor: hoveredClub === index ? `${club.color}` : "#f5f5f5",
                                            borderColor: `${club.color}`
                                        }}
                                        onMouseOver={() => setHoveredClub(index)}
                                        onMouseLeave={() => setHoveredClub(null)}
                                    >
                                        <img src={club.url} alt="club logo" className="w-20 md:w-28 pt-3 pl-3" />
                                        <div className="flex flex-row pb-2 items-center justify-between relative">
                                            <span className={`pl-6 tracking-widest font-semibold text-xs md:text-sm mr-12`}
                                                style={{ color: hoveredClub === index ? "white" : `${club.color}` }}
                                            >{club.name.toUpperCase()}</span>
                                            <div className="right-4 md:right-6 absolute">
                                                <Icon icon="cil:arrow-right" color={hoveredClub === index ? `white` : `${club.color}`} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                :
                <NotFound /> // if the search param doesn't match a valid league in the dataset, return the 404 page
            }
        </div>
    )
}