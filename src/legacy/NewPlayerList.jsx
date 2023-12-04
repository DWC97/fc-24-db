import { useCallback, useEffect, useRef, useState } from "react";
import { Player } from "./Player";

export function NewPlayerList({ players }){
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
        <div>
        <label>
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
        </div>

        <div>
            {sortedPlayers.map((player, index) => {
                if (sortedPlayers.length === index + 1){
                    return (
                        <div ref={lastPlayerElementRef} key={player.player_id}>
                            <Player  {...player} />
                        </div>
                    )
                }
                else {
                    return (
                        <div key={player.player_id}>
                            <Player  {...player} />
                        </div>
                    )
                }
            })}
        </div>
        </div>
    );
}