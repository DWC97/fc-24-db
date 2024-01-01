import data from "../data/male_teams.json"

export function Practice(){

    const teamData = data

    return (
        <div className="h-96 w-full flex items-center justify-center">
            {teamData.map(item => item.team_name)}
        </div>
    )
}