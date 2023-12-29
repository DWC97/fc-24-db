export function PlayerStack({ short_name, overall, player_positions, pace, shooting, passing, dribbling, defending, physic }){
    return (
        <div className="flex justify-end relative h-10 py-6 items-center border-b border-gray-300">
            <img src="https://cdn.sofifa.net/players/231/747/24_120.png" className="w-8 absolute left-0"/>
            <span className="absolute text-xs md:text-sm lg:text-base left-8 md:left-12 text-black tracking-wider">{short_name}</span>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" className="w-6"/>
            </div>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center">
                <img src="https://cdn.sofifa.net/meta/team/9/120.png" className="w-6"/>
            </div>
            <span className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium ml-3 mr-3 lg:mr-0">{player_positions.split(",")[0]}</span>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{overall}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{pace}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center  font-medium">
                <span className="bg-gray-300 py-1 px-2">{shooting}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{passing}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{dribbling}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{defending}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center  font-medium">
                <span className="bg-gray-300 py-1 px-2">{physic}</span>
            </div>
        </div>
    )
}