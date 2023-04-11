/*
 * app.js
*/

import Squordle from "./components/Squordle.js";

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App()
{ 
    console.log("APP!");

    // USER AUTH ---------------------------------------------------------------
    //Array is ['user', isLoggedIn]
    const [user, setUser] = useState(['', false]);
    function userHandler(name) {
        setUser([name, true]);
    }

    useEffect(() => {
        if (user[1]) console.log("WELCOME, " + user[0]);
    }, [user[1]]);

    // -------------------------------------------------------------------------

    // FETCH POKELIST... SHOULD ONLY EXECUTE ONCE ------------------------------
    const [pokeList, setPokeList] = useState(null);

    async function pokePromise() { 
        return await fetch(`http://localhost:3000/pokeList`)
                .then(result => result.json())
                .catch((err) => console.error(err));
    }

    useEffect(() => {
        if (!pokeList) {
            pokePromise()
                .then(function(result) {
                  setPokeList(result.map(p => p.name.toLowerCase()));
                }).catch(err => console.error(err));
        }
    }, [pokeList]);
    // -------------------------------------------------------------------------

    return (
        <div>
            { pokeList &&
                <Routes>
                <Route path='/' 
                       element={<Squordle id='squordle' 
                                          pokeList = {pokeList} 
                                          userHandler = {userHandler} />} />
                </Routes>
            }
        </div>
    );
}

export default App;
