import { Link, Route, Routes } from "react-router-dom";
import { SuggestedSearch } from "./legacy/SuggestedSearch";
import { PlayerPage } from "./legacy/PlayerPage";
import { NewPlayerList } from "./legacy/NewPlayerList";
import { Club } from "./pages/Club"
import { Nation } from "./pages/Nation"
import data from "./data/final.json"


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
        <Route path="/club/:id" element={<Club/>}/>
        <Route path="/nation/:id" element={<Nation/>}/>
      </Routes>
    </>
  )
}