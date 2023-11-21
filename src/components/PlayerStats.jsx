export function PlayerStats({ setCurrentPage, setList, setFilterCount }){

    function sortByStat(stat){
        setCurrentPage(1)
        setList(prev => {
            return prev.sort((a, b) => (a[stat] < b[stat]) ? 1 : -1)
        })
        setFilterCount(prev => prev + 1)
    }

    console.log(stat, abbreviation)

    return (
        <div id={id} className={stat} onClick={() => sortByStat({stat})}>{abbreviation}</div>
    )
}