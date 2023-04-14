/*
 * server.js
*/

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

/* middleware */
app.use(cors());
app.use(express.json());
app.use(require('./routing'));

// testing, testing... 1,2,3...
// app.use(require('./pokemonDAO'));

const dbo = require('./conn');

app.listen(PORT, () => {
    // perform db connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });

    console.log(`Server is running on port: ${PORT}`);
});
        
/*
// Global error handling
app.use(function (err, _req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
*/
