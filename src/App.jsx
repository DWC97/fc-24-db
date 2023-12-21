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


const players = data.results.filter(player => player.player_positions !== "GK")
console.log(players)

export default function App(){

  return (
    <>
      {/* <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>Search</Link>
      </div> */}
      <Navbar players={players}/>

      {/* <Routes>
        <Route path="/" element={<NewPlayerList players={players}/>} />
        <Route path="/search" element={<SuggestedSearch />} />
        <Route path="/player/:id" element={<PlayerPage/>}/>
        <Route path="/club/:id" element={<Club/>}/>
        <Route path="/nation/:id" element={<Nation/>}/>
      </Routes> */}
      <Routes>
        <Route path="/" element={<Home players={players}/>} />
        <Route path="/players" element={<Players players={players}/>} />
        <Route path="/player/:id" element={<Player players={players}/>}/>
        <Route path="/club/:id" element={<Club/>}/>
        <Route path="/nation/:id" element={<Nation/>}/>
        <Route path="/utility" element={<CreateJSON/>}/>
      </Routes>
    </>
  )
}