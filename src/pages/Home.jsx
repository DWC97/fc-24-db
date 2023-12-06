import { NewsModule } from "../components/NewsModule"

const newsPosters = [
    {
        "id": 1,
        "imageSrc": "assets/images/rice.jpeg",
        "desc": "GUNNERS' NEW SUPERMAN"
    },
    {
        "id": 2,
        "imageSrc": "assets/images/haaland.jpg",
        "desc": "HAALAND LEFT FURIOUS"
    },
    {
        "id": 3,
        "imageSrc": "assets/images/champions.jpg",
        "desc": "MATCHDAY 5 RESULTS"
    }
]

export function Home(){

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="mt-28">
                <img src="assets/logos/main.png" className="w-72"/>
            </div>
            <div className="text-custom-maroon text-2xl font-semibold tracking-widest py-8">
                THE ULTIMATE PLAYER DATABASE
            </div>
            <div className="pb-12">
                <input type="text" placeholder="Search player name..." className="border border-custom-grey py-2 px-24 rounded-lg text-center text-custom-grey"/>
            </div>
            <div className="flex flex-row pb-8">
               {newsPosters.map(item => {
                return <NewsModule {...item} />
               })}
            </div>
            <div className="text-xs text-custom-grey">
                Please note this is not a commercial product and is only hosted as part of a web development portfolio.
            </div>
        </div>
    )
}