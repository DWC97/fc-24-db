import { Route, Routes } from "react-router-dom";
import { Club } from "./pages/Club"
import { Nation } from "./pages/Nation"
import playersData from "./data/players.json"
import { Home } from "./pages/Home";
import { Players } from "./pages/Players";
import { Player } from "./pages/Player";
import { Navbar } from "./components/Navbar";
import { League } from "./pages/League";
import { Nations } from "./pages/Nations";

const players = playersData

export default function App(){

  return (
    <>
      <nav>
        <Navbar players={players}/>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<Home players={players}/>} />
          <Route path="/players" element={<Players players={players}/>} />
          <Route path="/players/:id" element={<Player players={players}/>}/>
          <Route path="/clubs/:id" element={<Club players={players}/>}/>
          <Route path="/leagues/:id" element={<League/>}/>
          <Route path="/nations/:id" element={<Nation players={players}/>}/>
          <Route path="/nations" element={<Nations/>}/>
        </Routes>
      </main>
    </>
  )
}