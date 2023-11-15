import { Route, Routes } from "react-router-dom";
import { PlayerList } from "./PlayerList";
import { SuggestedSearch } from "./SuggestedSearch";
import WdsSearch from "./WdsSearch";
import { PlayerPage } from "./PlayerPage";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<PlayerList />} />
      <Route path="/:id" element={<PlayerPage/>}/>
    </Routes>
  )
}