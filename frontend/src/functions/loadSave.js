/*
 *loadSave.js
*/

function loadSave()
{
    if (window.localStorage.length !== 13)
    {
        if (!(window.localStorage.gameMode)) {
            window.localStorage.gameMode = 0;
        }
        if (!(window.localStorage.pokeDollars)) {
            window.localStorage.firstTime = 1;
        }
        if (!(window.localStorage.pokeDollars)) {
            window.localStorage.pokeDollars = 0;
        }
        if (!(window.localStorage.adoptedShuckle)) {
            window.localStorage.adoptedShuckle = false;
        }
        if (!(window.localStorage.shopState)) {
            window.localStorage.shopState = 0;
        }  
        if (!(window.localStorage.spicyPoffin)) {
            window.localStorage.spicyPoffin = 0;
        }
        if (!(window.localStorage.sweetPoffin)) {
            window.localStorage.sweetPoffin = 0;
        }  
        if (!(window.localStorage.goldPoffin)) {
            window.localStorage.goldPoffin = 0;
        }  
        if (!(window.localStorage.lemonade)) {
            window.localStorage.lemonade = 0;
        }  
        if (!(window.localStorage.shuckleShiny)) {
            window.localStorage.shuckleShiny = 0;
        }  
        if (!(window.localStorage.shuckleChildren)) {
            window.localStorage.shuckleChildren = '[]';
        }
        if (!(window.localStorage.ticket0)) {
            window.localStorage.ticket0 = 0;
        }
        if (!(window.localStorage.region)) {
            window.localStorage.region = "kanto";
        }
    };
};

function loadUser(user)
{
            window.localStorage.pokeDollars = user['saveState']['pokeDollars'];
            window.localStorage.adoptedShuckle = user[saveState][];
            window.localStorage.shopState = user[saveState][];
            window.localStorage.spicyPoffin = user[saveState][];
            window.localStorage.sweetPoffin = user[saveState][];
            window.localStorage.goldPoffin = user[saveState][];
            window.localStorage.lemonade = user[saveState][];
            window.localStorage.shuckleShiny = user[saveState][];
            window.localStorage.shuckleChildren = user[saveState][];
            window.localStorage.ticket0 = user[saveState][];
            window.localStorage.region = user[saveState][];
}

export default loadSave;
