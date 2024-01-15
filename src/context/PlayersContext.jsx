import React, { createContext, useContext } from 'react';

const PlayersContext = createContext();

export function PlayersProvider({ children, value }){
    return (
        <PlayersContext.Provider value={value}>
            {children}
        </PlayersContext.Provider>
    )
}

export function usePlayers(){
    const context = useContext(PlayersContext);
    return context
}