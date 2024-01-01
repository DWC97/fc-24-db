import data from "../data/male_teams.json"
import { Link } from "react-router-dom"

export function Practice(){

    const teamData = data
    
    const clubMenuItems = [
        {
            "league": "Premier League",
            "clubs": [
                {
                    "name": "AFC Bournemouth"
                },
                {
                    "name": "Arsenal"
                },
                {
                    "name": "Aston Villa"
                },
                {
                    "name": "Brentford"
                },
                {
                    "name": "Brighton & Hove Albion"
                },
                {
                    "name": "Burnley"
                },
                {
                    "name": "Chelsea"
                },
                {
                    "name": "Crystal Palace"
                },
                {
                    "name": "Everton"
                },
                {
                    "name": "Fulham"
                },
                {
                    "name": "Liverpool"
                },
                {
                    "name": "Luton Town"
                },
                {
                    "name": "Manchester City"
                },
                {
                    "name": "Manchester United"
                },
                {
                    "name": "Newcastle United"
                },
                {
                    "name": "Nottingham Forest"
                },
                {
                    "name": "Sheffield United"
                },
                {
                    "name": "Tottenham Hotspur"
                },
                {
                    "name": "West Ham"
                },
                {
                    "name": "Wolverhampton Wanderers"
                }
            ]
        }
    ]

    return (
        <div className=" w-full flex items-center">
            <ul className="mt-96">
                {clubMenuItems.map(league => {
                    return league.clubs.map(club => {
                        return (
                            <Link to={`/clubs/${club.name}`}><li key={club.name}>{club.name}</li></Link>
                        )
                    })
                })}
            </ul>
            
        </div>
    )
}