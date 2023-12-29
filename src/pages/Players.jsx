import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';
import { PlayerStack } from "../components/PlayerStack";

export function Players({ players }){

    const [positionFilter, setPositionFilter] = useState('');
    const [sortedBy, setSortedBy] = useState('overall');
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
                <p className="text-gray-500 text-xs md:text-base">Showing {players.filter(player => {
                    if (positionFilter === "ALL") return player
                    else {
                        return player.player_positions.includes(positionFilter)
                    }
                }).length} results</p>
                <p className="text-custom-maroon hidden md:flex">Filter by position and sort by attributes</p>
                <button className="bg-custom-maroon text-white hidden md:flex p-2 md:px-4 md:py-2 rounded-md cursor-pointer text-xs md:text-base" onClick={() => {
                    setPositionFilter("ALL")
                    setSortedBy("overall")
                    setSortOrder('desc')
                }}>Remove Filters</button>
            </div>

            <div>
                <div className="flex flex-row py-2 items-center justify-end mt-4 sticky top-20 font-bold bg-white border-b border-gray-300 text-custom-maroon z-10">
                    <span className="absolute text-sm lg:text-base left-2 lg:left-4 text-custom-grey">PLAYER</span>
                    <span className="w-16 md:w-12 lg:w-16 text-sm lg:text-base flex justify-center">NAT</span>
                    <span className="w-16 md:w-12 lg:w-16 text-sm lg:text-base flex justify-center">CLUB</span>
                    <select className="ml-2 lg:ml-3 w-16 text-sm lg:text-base hidden md:flex" value={positionFilter} onChange={e => setPositionFilter(e.target.value)}>
                    {playerPositions.map(position => (
                        <option key={position} value={position}>
                        {position}
                        </option>
                    ))}
                    </select>
                    <span className="w-16 text-sm md:text-base flex justify-center md:hidden">OVE</span>
                    {playerStats.map(stat => {
                        return (
                        <div key={stat.name} className="w-12 lg:w-16 text-sm lg:text-base hidden md:flex justify-center relative"
                        onClick={() => toggleSortOrder(stat.name)}>
                            <span>{stat.abbreviation}</span>
                            {sortedBy === stat.name && <div className="absolute -right-1 lg:right-0 top-1">
                                <Icon icon={`ph:arrow-${sortOrder === "desc" ? `down` : `up`}-bold`} color="#950206" />
                            </div>}
                            
                        </div>
                        )
                    })}
                    
                </div>

                <div>
                    {sortedPlayers.map((player, index) => {
                        if (sortedPlayers.length === index + 1){
                            return (
                                <div ref={lastPlayerElementRef} key={player.player_id} className="odd:bg-slate-50 even:bg-white">
                                    <PlayerStack {...player} />
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={player.player_id} className="odd:bg-slate-50 even:bg-white">
                                    <div>
                                        <PlayerStack {...player} />
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