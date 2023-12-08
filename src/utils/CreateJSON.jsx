import fs from 'fs'; 
import data from "../data/final.json"

export function CreateJSON(){

    const rawData = data.results.filter(player => player.player_positions !== "GK")
    console.log(rawData)

    function createFile(){
        fs.writeFile('data.json', JSON.stringify(data), (err) => { 
            if (err) { 
              console.error(err); 
              return; 
            } 
            console.log('JSON file created successfully'); 
          }); 
    }

    return (
        <div className="h-96 w-full flex items-center justify-center">
            <button onClick={createFile} className="bg-red-500 text-white p-4">Create JSON</button>
        </div>
    )
}