import { createContext } from "react";
import { useState } from "react";

export const songContext = createContext() ; 

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState(null); 
    const [loading , setLoading] = useState(false) ;
    
    return(
        <songContext.Provider value={{song , setSong , loading , setLoading}}>
            {children}
        </songContext.Provider>
    )
}