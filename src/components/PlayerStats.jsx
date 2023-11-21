export function PlayerStats({ setCurrentPage, setList, setFilterCount }){

    const playerStats = [
        {
            "name": "overall",
            "abbreviation": "OVE"
        },
        {
            "name": "pace",
            "abbreviation": "PAC"
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
                    <div key={stat.abbreviation} className={stat.name}>{stat.abbreviation}</div>
                )
            })}
        </div>
    )
}