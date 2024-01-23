import { useEffect, useState } from "react"

export function Practice(){

    const lewan = 'https://cdn.sofifa.net/players/188/545/24_120.png'
  const kylian = "https://cdn.sofifa.net/players/231/747/24_120.png"
  const parejo = "https://cdn.sofifa.net/players/189/513/24_120.png"

  const [playerImage, setPlayerImage] = useState(null)

    useEffect(() => {

        const imageUrl = lewan;
  
        fetch(`/proxy?url=${encodeURIComponent(imageUrl)}`)
        .then(async () => {
          setPlayerImage(imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          setPlayerImage("https://cdn.sofifa.net/player_0.svg");
        });
  
      }, [])

    return (
        <div>
            {(typeof playerImage === null) ? (
            <div>
                <img src="https://cdn.sofifa.net/player_0.svg"/>
            </div>
            ): (
            <div>
                <img src={playerImage} onError={() => setPlayerImage("https://cdn.sofifa.net/player_0.svg")}/>
            </div>
            )}
      </div>
    )
}

// className="h-96 flex justify-center items-center bg-red-300"