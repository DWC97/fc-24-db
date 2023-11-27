import { useState } from "react";
import { Player } from "./Player";

export function NewPlayerList({ players }){
    const [positionFilter, setPositionFilter] = useState('');
  const [sortedBy, setSortedBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const toggleSortOrder = (stat) => {
    if (sortedBy === stat) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortOrder('desc');
    }
    setSortedBy(stat);
  };

  const sortedPlayers = players
    .filter(player => !positionFilter || positionFilter === 'ALL' || player.player_positions.includes(positionFilter))
    .sort((a, b) => {
      const orderFactor = sortOrder === 'asc' ? 1 : -1;
      return (a[sortedBy] - b[sortedBy]) * orderFactor;
    });

//   const uniquePositions = [...new Set(players.map(player => player.club_position))];
  
//   const positionOptions = ['ALL', ...uniquePositions];
  const playerPositions = ["ALL", "ST", "CF", "LW", "LM", "RW", "RM", "CAM", "CM", "CDM", "LWB", "LB", "RWB", "RB", "CB"]
  const playerStats = [
    {
        "name": "overall",
        "abbreviation": "OVE"

    },
    {
        "name": "pace",
        "abbreviation": "PAC"
    },
    {
        "name": "shooting",
        "abbreviation": "SHO"
    },
    {
        "name": "passing",
        "abbreviation": "PAS"
    },
    {
        "name": "dribbling",
        "abbreviation": "DRI"
    },
    {
        "name": "defending",
        "abbreviation": "DEF"
    },
    {
        "name": "physic",
        "abbreviation": "PHY"
    }
]

  return (
    <div>
      <label>
        Filter by Position:
        <select value={positionFilter} onChange={e => setPositionFilter(e.target.value)}>
          {playerPositions.map(position => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </label>

      <div>
        {playerStats.map(stat => (
          <span
            key={stat.name}
            style={{ cursor: 'pointer', marginRight: '10px', fontWeight: sortedBy === stat.name ? 'bold' : 'normal' }}
            onClick={() => toggleSortOrder(stat.name)}
          >
            {stat.abbreviation}
          </span>
        ))}
      </div>

      <div>
        {sortedPlayers.map(player => (
          <Player key={player.player_id} {...player} />
        ))}
      </div>
    </div>
  );
}