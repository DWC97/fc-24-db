import data from "./final.json"

export function PlayerList(){

    const list = data.results

    return (
        <div className="player-list">
            {list.map(item => {
                return <div key={item.player_id}>
                            {`${item.short_name} - ${item.overall}`}
                        </div>
            })}
        </div>
    )
}