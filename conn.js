/*
 * conn.js
*/

const { MongoClient } = require("mongodb");

const Db = process.env.SQUORDLE_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;
module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("squordle");
                console.log("Successfully connected to MongoDB");
            }
            
            return callback();
        });
    },

    getDb: function() {
        return _db;
    },
};
