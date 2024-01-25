// pages
import { Club } from "./pages/Club"
import { NationDetails } from "./pages/NationDetails"
import { Home } from "./pages/home/Home"
import { PlayerSearch } from "./pages/PlayerSearch"
import { PlayerDetails } from "./pages/PlayerDetails"
import { NotFound } from "./pages/NotFound"
import { League } from "./pages/League"
import { NationSearch } from "./pages/NationSearch"

// components
import { Navbar } from "./components/navbar/Navbar"

// data
import playersData from "./data/players.json"

// context
import { PlayersProvider } from "./context/PlayersContext"

// routing
import { Route, Routes } from "react-router-dom"


export default function App(){

  const players = playersData // player data list

  return (
    <PlayersProvider value={players}> {/* player data passed into context provider as value */}
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} /> 
          <Route path="players" >
            <Route index element={<PlayerSearch />}/>
            <Route path=":id" element={<PlayerDetails />}/>
          </Route>
          <Route path="clubs">
            <Route path=":id" element={<Club />}/>
          </Route>
          <Route path="leagues">
            <Route path=":id" element={<League/>}/>
          </Route>
          <Route path="nations">
            <Route index element={<NationSearch/>}/>
            <Route path=":id" element={<NationDetails />}/>
          </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </main>
    </PlayersProvider>
  )
}