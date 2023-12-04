export function Player({ short_name, position, overall, pace, shooting, passing, dribbling, defending, physic }){
    return (
        <div>
            {short_name}
            {position}
            {overall}
        </div>
    )
}