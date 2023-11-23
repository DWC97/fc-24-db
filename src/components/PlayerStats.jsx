export function PlayerStats({ setFilterCount, stats, setStats, setCurrentPage }){

    function sortByStat(stat){
        
        setStats((prev) => {
            return prev.map(s => {
                if (s === stat){
                    return {...s, clicked: true, flipped: !s.flipped}
                }
                else {
                    return {...s, clicked: false, flipped: true}
                }
            })
        })
        
        setCurrentPage(1)
        setFilterCount(prev => prev + 1)
    }

    return (
        <div>
            {stats.map(stat => {
                return (
                    <div 
                    style={{ color: stat.clicked? 'red' : "black" }}
                    key={stat.abbreviation} 
                    className={stat.name}
                    onClick={() => sortByStat(stat)}>
                        {stat.abbreviation}
                    </div>
                )
            })}
        </div>
    )
}