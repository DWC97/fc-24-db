// hooks
import { useCallback, useEffect, useRef, useState } from "react"

// components
import { PlayerStack } from "./PlayerStack"

// routing
import { useSearchParams } from "react-router-dom"

// assets
import { Icon } from '@iconify/react'


// table of players with filters and sorting functionality
export function Table({ players }){

    const [currentPage, setCurrentPage] = useState(1) // page of player results to be displayed in table
    const [searchParams, setSearchParams] = useSearchParams({ positionFilter: "ALL", sortedBy: "overall", sortOrder: "desc"}) 
    // search params to keep track of filters and persist them across routes
    const positionFilter = searchParams.get("positionFilter") 
    const sortedBy = searchParams.get("sortedBy")
    const sortOrder = searchParams.get("sortOrder")

    // toggle order of players
    function toggleSortOrder(stat){
        if (sortedBy === stat) {
            setSearchParams(prev => {
                prev.set("sortOrder", sortOrder === 'asc' ? 'desc' : 'asc')
                return prev
            })
        } else {
            setSearchParams(prev => {
                prev.set("sortOrder", "desc")
                return prev
            })
        }
        setSearchParams(prev => {
            prev.set("sortedBy", stat)
            return prev
        })
    }

    // player list with filters and sorting applied
    const sortedPlayers = players
        .filter(player => !positionFilter || positionFilter === 'ALL' || player.player_positions.includes(positionFilter))
        .sort((a, b) => {
        const orderFactor = sortOrder === 'asc' ? 1 : -1
        return (a[sortedBy] - b[sortedBy]) * orderFactor
        })
        .slice(0, 40 * currentPage)
    
    // array of player positions for position filter dropdown
    const playerPositions = ["ALL", "ST", "CF", "LW", "LM", "RW", "RM", "CAM", "CM", "CDM", "LWB", "LB", "RWB", "RB", "CB"]
    // array of objects containing info on each player attribute 
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

    // reset the current page to 1 if any of the filters change
    useEffect(() => {

        setCurrentPage(1)

    }, [positionFilter, sortOrder, sortedBy])

    // reference for scroll position in relation to last player in rendered list
    const observer = useRef()
    const lastPlayerElementRef = useCallback(node => {
  
        // disconnect observer from previous element
        if (observer.current) observer.current.disconnect()
        // set new observer = intersection function
        observer.current = new IntersectionObserver(entries => {
            // if observer intersects with last rendered player, increase the current page number
            if (entries[0].isIntersecting){
                setCurrentPage(prevNumber => prevNumber + 1)
            }
        })

        // observer the last element
        if (node) observer.current.observe(node)
    }, [])

    return (
        <div>
            {/* text content */}
            <div className="flex flex-row justify-between mt-12 font-medium items-center">
                <p className="text-gray-500 text-xs md:text-base italic font-normal">Showing {players.filter(player => {
                    if (positionFilter === "ALL") return player
                    else {
                        return player.player_positions.includes(positionFilter)
                    }
                }).length} results</p>
                <p className="text-custom-maroon hidden md:flex">Filter by position and sort by attributes</p>
                <button className="hover:bg-custom-maroon text-custom-maroon border-2 border-custom-maroon hover:text-white hidden md:flex p-2 md:px-4 md:py-2 rounded-md cursor-pointer text-xs md:text-base ease-in-out duration-300" onClick={() => {
                    setSearchParams(prev => {
                        prev.set("positionFilter", "ALL")
                        prev.set("sortedBy", "overall")
                        prev.set("sortOrder", "desc")
                        return prev
                    })
                }}>Reset Filters</button>
            </div>

            <div>
                {/* column headings */}
                <div className="flex flex-row py-2 items-center justify-end mt-4 sticky top-16 font-bold bg-white border-b border-gray-300 text-custom-maroon z-10">
                    <span className="absolute text-sm lg:text-base left-2 lg:left-4 text-custom-grey">PLAYER</span>
                    <span className="w-16 md:w-12 lg:w-16 text-sm lg:text-base flex justify-center">NAT</span>
                    <span className="w-16 md:w-12 lg:w-16 text-sm lg:text-base flex justify-center">CLUB</span>
                    <select className="ml-2 lg:ml-3 w-16 text-sm lg:text-base hidden md:flex" value={positionFilter} 
                    onChange={e => setSearchParams(prev => {
                        prev.set("positionFilter", e.target.value)
                        return prev
                    })}
                    >
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
                    {/* rendered player list */}
                    {sortedPlayers.map((player, index) => {
                        if (sortedPlayers.length === index + 1){
                            // Get a reference to the last player in the rendered list
                            return (
                                <div ref={lastPlayerElementRef} key={player.player_id} className="odd:bg-slate-50 even:bg-white">
                                    <PlayerStack {...player} />
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={player.player_id} className="odd:bg-slate-50 even:bg-white">
                                    <PlayerStack {...player} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}