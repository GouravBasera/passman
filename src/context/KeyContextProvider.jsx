import React, { useState } from "react";
import KeyContext from "./KeyContext";

const KeyContextProvider = ({children})=>{
    const [key, setKey] = useState(null)
    return (
        <KeyContext.Provider value={{key, setKey}}>
        {children}
        </KeyContext.Provider>
    )
}

export default KeyContextProvider