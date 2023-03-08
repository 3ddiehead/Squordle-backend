/*
 * GameSpace.js
*/

import GameRow from "./GameRow.js";
import classes from "./style/GameSpace.module.css";

import { useState, useEffect } from 'react';

function GameSpace(props)
{
    const [counter, setCounter] = useState(1);

    useEffect(() => { 
        counter > 0 && setTimeout(() => setCounter(counter + 1), 1000);
    }, [counter]);

    return (
        <div className = {classes.gameSpace} 
             style = {{gridTemplateRows: "1fr ".repeat(6)}}>
            { props.gameSpace.map((row) => 
                (<GameRow key = {row.id}
                          state = {row.state}
                          length = {row.length}
                          boxes = {row.boxes}
                          guess = {row.guess}
                          upDownPos = {-10 * (counter % 2)}/>)) }
        </div>
  )
}

export default GameSpace;
