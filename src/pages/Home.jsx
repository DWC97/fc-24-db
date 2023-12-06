export function Home(){
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div>
                <img src="assets/logos/main.png" className="w-96"/>
            </div>
            <div>
                THE ULTIMATE PLAYER DATABASE
            </div>
            <div>
                <input type="text" placeholder="Search player name..." />
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <img src="assets/images/champions.jpg" className="w-48 h-24"/>
                    <span>MATCHDAY 5 RESULTS</span>
                </div>
            </div>
            <div>
                Please note this is not a commercial product and is only hosted as part of a web development portfolio.
            </div>
        </div>
    )
}