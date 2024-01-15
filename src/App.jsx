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
      <header>
        <nav>
          <Navbar players={players}/>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home players={players}/>} />
          <Route path="players" >
            <Route index element={<Players players={players}/>}/>
            <Route path=":id" element={<Player players={players}/>}/>
          </Route>
          <Route path="clubs">
            <Route path=":id" element={<Club players={players}/>}/>
          </Route>
          <Route path="leagues">
            <Route path=":id" element={<League/>}/>
          </Route>
          <Route path="nations">
            <Route index element={<Nations/>}/>
            <Route path=":id" element={<Nation players={players}/>}/>
          </Route>
        </Routes>
      </main>
    </>
  )
}