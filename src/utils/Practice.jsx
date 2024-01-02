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
    <div className="bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <div className="mr-8 cursor-pointer">Home</div>
        <div className="relative group">
          <div className="cursor-pointer">Clubs</div>
          <div className="dropdown hidden group-hover:block">
            {leagues.map(league => (
              <div
                key={league.name}
                className="cursor-pointer p-2 relative group"
                onMouseEnter={() => setSelectedLeague(league)}
                onMouseLeave={() => setSelectedLeague(null)}
              >
                {league.name}
                {selectedLeague === league && (
                  <div className="side-menu absolute left-full top-0 bg-gray-700 p-2">
                    {league.clubs.map(club => (
                      <div key={club} className="cursor-pointer p-2">
                        {club}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

 {/* <div>
                {teamData.results.map(item => {
                    if (item.league_name === "Bundesliga"){
                        return item.team_name
                    }
                }).sort()}
            </div> */}