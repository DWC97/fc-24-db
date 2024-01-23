import { Route, Routes } from "react-router-dom";
import { Club } from "./pages/Club"
import { Nation } from "./pages/Nation"
import playersData from "./data/players.json"
import { Home } from "./pages/Home";
import { Players } from "./pages/Players";
import { Player } from "./pages/Player";
import { Navbar } from "./components/navbar/Navbar";
import { League } from "./pages/League";
import { Nations } from "./pages/Nations";
import { PlayersProvider } from "./context/PlayersContext";
import { NotFound } from "./pages/NotFound";
import { Practice } from "./pages/Practice";

export default function App(){

  const players = playersData

  return (
    <PlayersProvider value={players}>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} /> 
          <Route path="players" >
            <Route index element={<Players />}/>
            <Route path=":id" element={<Player />}/>
          </Route>
          <Route path="clubs">
            <Route path=":id" element={<Club />}/>
          </Route>
          <Route path="leagues">
            <Route path=":id" element={<League/>}/>
          </Route>
          <Route path="nations">
            <Route index element={<Nations/>}/>
            <Route path=":id" element={<Nation />}/>
          </Route>
          <Route path="*" element={<NotFound />}/>
          <Route path="practice" element={<Practice />}/>
        </Routes>
      </main>
    </PlayersProvider>
  )
}