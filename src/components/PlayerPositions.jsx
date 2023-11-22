export function PlayerPositions(){

    const playerPositions = ["ST", "LW", "CM", "CAM", "CF", "CDM", "CB", "RW", "LM", "LWB", "LB", "RM", "RWB", "RB"]

    return (
        <div>
            {playerPositions.map(position => {
                return (
                        <label 
                        key={position}>
                            <input type="checkbox" />
                            {position}
                        </label>
                        )
            })}
        </div>
    )
}