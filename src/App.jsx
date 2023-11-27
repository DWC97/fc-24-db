import { Link, Route, Routes } from "react-router-dom";
import { PlayerList } from "./PlayerList";
import { SuggestedSearch } from "./SuggestedSearch";
import WdsSearch from "./WdsSearch";
import { PlayerPage } from "./PlayerPage";
import { NewPlayerList } from "./NewPlayerList";
import data from "./final.json"


const players = data.results.filter(player => player.player_positions !== "GK")
console.log(players)

export default function App(){

  return (
    <>
      <div>
        <Link to={"/"}>Home</Link>
        <br/>
        <br/>
        <Link to={"/search"}>Search</Link>
      </div>

      <Routes>
        <Route path="/" element={<NewPlayerList players={players}/>} />
        <Route path="/search" element={<SuggestedSearch />} />
        <Route path="/player/:id" element={<PlayerPage/>}/>
      </Routes>
    </>
  )
}