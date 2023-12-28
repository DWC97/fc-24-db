import { useCallback, useEffect, useRef, useState } from "react";

export function Players({ players }){

    const [positionFilter, setPositionFilter] = useState('');
    const [sortedBy, setSortedBy] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);

    const toggleSortOrder = (stat) => {
        if (sortedBy === stat) {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
        setSortOrder('desc');
        }
        setSortedBy(stat);
    };

    const sortedPlayers = players
        .filter(player => !positionFilter || positionFilter === 'ALL' || player.player_positions.includes(positionFilter))
        .sort((a, b) => {
        const orderFactor = sortOrder === 'asc' ? 1 : -1;
        return (a[sortedBy] - b[sortedBy]) * orderFactor;
        })
        .slice(0, 40 * currentPage);

    const playerPositions = ["ALL", "ST", "CF", "LW", "LM", "RW", "RM", "CAM", "CM", "CDM", "LWB", "LB", "RWB", "RB", "CB"]
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

    useEffect(() => {
        setCurrentPage(1)
    }, [positionFilter, sortOrder, sortedBy])

    const observer = useRef()
    const lastPlayerElementRef = useCallback(node => {
  
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                console.log("observed")
                setCurrentPage(prevNumber => prevNumber + 1)
                console.log(currentPage)
            }
        })

        if (node) observer.current.observe(node)
    }, [])

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">FC 24 PLAYERS</h1>
                <p className="text-custom-grey">Ratings & statistics for male players in Europe’s top five leagues. </p>
            </div>

            <div className="flex flex-row justify-between mt-12 font-medium">
                <p className="text-gray-500">Showing {players.filter(player => {
                    if (positionFilter === "ALL") return player
                    else {
                        return player.player_positions.includes(positionFilter)
                    }
                }).length} results</p>
                <p className="text-custom-maroon">Filter by position and sort by attributes</p>
                <button className="bg-custom-maroon text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => {
                    setPositionFilter("ALL")
                    setSortedBy("overall")
                    setSortOrder('desc')
                }}>Remove Filters</button>
            </div>

            <div>
                {/* <label>
                    Filter by Position:
                    <select value={positionFilter} onChange={e => setPositionFilter(e.target.value)}>
                    {playerPositions.map(position => (
                        <option key={position} value={position}>
                        {position}
                        </option>
                    ))}
                    </select>
                </label>

                <div>
                    {playerStats.map(stat => (
                    <span
                        key={stat.name}
                        style={{ cursor: 'pointer', marginRight: '10px', fontWeight: sortedBy === stat.name ? 'bold' : 'normal' }}
                        onClick={() => toggleSortOrder(stat.name)}
                    >
                        {stat.abbreviation}
                    </span>
                    ))}
                </div> */}

                <div className="flex flex-row items-center justify-end text-white bg-custom-maroon mt-4 sticky top-20">
                    <span className="absolute left-0">PLAYER</span>
                    <span className="w-16 border border-1 border-blue-500 flex justify-center">NAT</span>
                    <span className="w-16 border border-1 border-blue-500 flex justify-center">TEAM</span>
                    <select value={positionFilter} onChange={e => setPositionFilter(e.target.value)}>
                    {playerPositions.map(position => (
                        <option key={position} value={position}>
                        {position}
                        </option>
                    ))}
                    </select>
                    {playerStats.map(stat => {
                        return (
                        <div key={stat.name} className="w-16 border border-1 border-blue-500 flex justify-center"
                        onClick={() => toggleSortOrder(stat.name)}>
                            {stat.abbreviation}
                        </div>
                        )
                    })}
                    
                </div>

                <div>
                    {sortedPlayers.map((player, index) => {
                        if (sortedPlayers.length === index + 1){
                            return (
                                <div ref={lastPlayerElementRef} key={player.player_id}>
                                    <div>
                                        {player.short_name}
                                        {player.position}
                                        {player.overall}
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={player.player_id}>
                                    <div>
                                        {player.short_name}
                                        {player.position}
                                        {player.overall}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}