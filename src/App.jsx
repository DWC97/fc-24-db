import { Link, Route, Routes } from "react-router-dom";
import { PlayerList } from "./PlayerList";
import { SuggestedSearch } from "./SuggestedSearch";
import WdsSearch from "./WdsSearch";
import { PlayerPage } from "./PlayerPage";
import { useFetchData } from "./useFetchData";

export default function App(){
  useFetchData()
  return (
    <>
      <div>
        <Link to={"/"}>Home</Link>
        <br/>
        <br/>
        <Link to={"/search"}>Search</Link>
      </div>

      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/search" element={<SuggestedSearch />} />
        <Route path="/player/:id" element={<PlayerPage/>}/>
      </Routes>
    </>
  )
}