export function PlayerStack({ short_name, overall, player_positions, pace, shooting, passing, dribbling, defending, physic }){
    return (
        <div className="flex justify-end relative h-10 py-1 items-center border-b border-gray-300">
            <img src="https://cdn.sofifa.net/players/231/747/24_120.png" className="w-8 absolute left-0"/>
            <span className="absolute left-12 text-black">{short_name}</span>
            <div className="w-16 flex justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" className="w-8"/>
            </div>
            <div className="w-16 flex justify-center">
                <img src="https://cdn.sofifa.net/meta/team/9/120.png" className="w-8"/>
            </div>
            <span className="w-16 flex justify-center">{player_positions.split(",")[0]}</span>
            <span className="w-16 flex justify-center ml-3">{overall}</span>
            <span className="w-16 flex justify-center">{pace}</span>
            <span className="w-16 flex justify-center">{shooting}</span>
            <span className="w-16 flex justify-center">{passing}</span>
            <span className="w-16 flex justify-center">{dribbling}</span>
            <span className="w-16 flex justify-center">{defending}</span>
            <span className="w-16 flex justify-center">{physic}</span>
        </div>
    )
}