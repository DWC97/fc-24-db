export function PlayerStats({ setCurrentPage, setList, setFilterCount }){

    const playerStats = [
        {
            "name": "overall",
            "abbreviation": "OVE"
        },
        {
            "name": "pace",
            "abbreviation": "PAC"
        },
        {
            "name": "shooting",
            "abbreviation": "SHO"
        },
        {
            "name": "passing",
            "abbreviation": "PAS"
        },
        {
            "name": "dribbling",
            "abbreviation": "DRI"
        },
        {
            "name": "defending",
            "abbreviation": "DEF"
        },
        {
            "name": "physic",
            "abbreviation": "PHY"
        }
    ]

    function sortByStat(stat){
        setCurrentPage(1)
        setList(prev => {
            return prev.sort((a, b) => (a[stat] < b[stat]) ? 1 : -1)
        })
        setFilterCount(prev => prev + 1)
    }

    return (
        <div>
            {playerStats.map(stat => {
                return (
                    <div 
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