import { useParams } from "react-router-dom"
import leagueData from "../data/leagues.json"
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';

export function League(){

    const { id } = useParams()
    const league = leagueData.leagues.find(league => league.name === id)
    console.log(league)

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-row items-center mt-32 bg-custom-grey h-16 md:h-24">
                <img src={league.url} className="w-10 md:w-12 mx-4 md:mx-8"/>
                <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">{league.name.toUpperCase()}</h1>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8">
                {league.clubs.map(club => {
                    return (
                    <Link to={`/clubs/${club.name}`}>
                        <div key={club.name} className="flex flex-col justify-between bg-gray-100 border-b-2 border-custom-grey rounded-3xl h-44">
                            <img src={club.url} className="w-28 pt-3 pl-3"/>
                            <div className="flex flex-row pb-2 items-center justify-between">
                                <span className="pl-6 tracking-widest font-semibold text-custom-grey">{club.name.toUpperCase()}</span>
                                <div className="mr-6">
                                    <Icon icon="cil:arrow-right" color="#2c2e2d" />
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