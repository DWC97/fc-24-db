import { useState } from "react"

export function PlayerStats({ setCurrentPage, setList, setFilterCount }){

    const playerStats = [
        {
            "name": "overall",
            "abbreviation": "OVE",
            "clicked": false
        },
        {
            "name": "pace",
            "abbreviation": "PAC",
            "clicked": false
        },
        {
            "name": "shooting",
            "abbreviation": "SHO",
            "clicked": false
        },
        {
            "name": "passing",
            "abbreviation": "PAS",
            "clicked": false
        },
        {
            "name": "dribbling",
            "abbreviation": "DRI",
            "clicked": false
        },
        {
            "name": "defending",
            "abbreviation": "DEF",
            "clicked": false
        },
        {
            "name": "physic",
            "abbreviation": "PHY",
            "clicked": false
        }
    ]

    const [stats, setStats] = useState(playerStats)
    
    function sortByStat(stat){
        
        console.log(stats)
        setStats((prev) => {
            return prev.map(s => {
                if (s.name === stat){
                    return {...s, clicked: true}
                }
                else {
                    return {...s, clicked: false}
                }
            })
        })

        // const statObj = stats.find(s => {
        //     return s.name === stat
        // })
        // console.log(statObj)

        setCurrentPage(1)
        setList(prev => {
            return prev.sort((a, b) => (a[stat] < b[stat]) ? 1 : -1)
        })
        setFilterCount(prev => prev + 1)
    }

    return (
        <div>
            {stats.map(stat => {
                return (
                    <div 
                    style={{ color: stat.clicked? 'blue' : "black" }}
                    key={stat.abbreviation} 
                    className={stat.name}
                    onClick={() => sortByStat(stat.name)}>
                        {stat.abbreviation}
                    </div>
                )
            })}
        </div>
    )
}