import { useState } from "react";
import data from "../data/male_teams.json"
import { Link } from "react-router-dom"

export function Practice(){

    const [isDropdownVisible, setDropdownVisible] = useState(false);

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
        },
        {
            "league": "Bundesliga",
            "clubs": [
                {
                    "name": "Bayer 04 Leverkusen"
                },
                {
                    "name": "Borussia Dortmund"
                },
                {
                    "name": "Borussia Mönchengladbach"
                },
                {
                    "name": "Darmstadt 98"
                },
                {
                    "name": "Eintracht Frankfurt"
                },
                {
                    "name": "FC Augsburg"
                },
                {
                    "name": "FC Bayern München"
                },
                {
                    "name": "FC Köln"
                },
                {
                    "name": "FC Union Berlin"
                },
                {
                    "name": "FSV Mainz 05"
                },
                {
                    "name": "Heidenheim"
                },
                {
                    "name": "RB Leipzig"
                },
                {
                    "name": "SC Freiburg"
                },
                {
                    "name": "TSG Hoffenheim"
                },
                {
                    "name": "VfB Stuttgart"
                },
                {
                    "name": "VfL Bochum 1848"
                },
                {
                    "name": "VfL Wolfsburg"
                },
                {
                    "name": "Werder Bremen"
                }
            ]
        }
    ]

    const handleMouseEnter = () => {
        setDropdownVisible(true);
        console.log("entered")
      };
    
    const handleMouseLeave = () => {
    setDropdownVisible(false);
    console.log("left")
    };

    const [selectedLeague, setSelectedLeague] = useState(null);

    const leagues = [
        { name: 'Premier League', clubs: ['Club A', 'Club B', 'Club C'] },
        { name: 'Bundesliga', clubs: ['Club X', 'Club Y', 'Club Z'] },
        // Add more leagues and clubs as needed
  ];

  return (
    <div className="bg-slate-50 text-red p-4 w-96">
       <div className="mt-20 w-96">
                {teamData.results.map(item => {
                    if (item.league_id === 31){
                        return item.team_name
                    }
                }).sort()}
            </div>
    </div>
  );
}

