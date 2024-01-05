import { Link, Route, Routes } from "react-router-dom";
import { SuggestedSearch } from "./legacy/SuggestedSearch";
import { PlayerPage } from "./legacy/PlayerPage";
import { NewPlayerList } from "./legacy/NewPlayerList";
import { Club } from "./pages/Club"
import { Nation } from "./pages/Nation"
import data from "./data/final.json"
import { Home } from "./pages/Home";
import { Players } from "./pages/Players";
import { Player } from "./pages/Player";
import { Navbar } from "./components/Navbar";
import { CreateJSON } from "./utils/CreateJSON";
import { Practice } from "./utils/Practice";
import { League } from "./pages/League";

const players = data.results.filter(player => player.player_positions !== "GK")
console.log(players)

export default function App(){

  return (
    <>
     
      <Navbar players={players}/>


      <Routes>
        <Route path="/" element={<Home players={players}/>} />
        <Route path="/players" element={<Players players={players}/>} />
        <Route path="/players/:id" element={<Player players={players}/>}/>
        <Route path="/clubs/:id" element={<Club players={players}/>}/>
        <Route path="/leagues/:id" element={<League/>}/>
        <Route path="/nations/:id" element={<Nation players={players}/>}/>
        <Route path="/utility" element={<Practice/>}/>
      </Routes>
    </>
  )
}