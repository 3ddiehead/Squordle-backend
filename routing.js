/*
 * routing.js
*/

const router = require('express').Router();
const dbo = require('./conn');

// helps convert the ID from string to ObjectId for the _id
const ObjectID = require('mongodb').ObjectId;

router.route('/pokeList').get(async function (req, res) 
{
    dbo.getDb('squordle')
       .collection('pokemon')
       .aggregate([{ $project: { _id: 0 } },
                   { $match: { } },
                   { $sort:    { 'entryNum': 1 } } 
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching pokemon collection');
           else
               res.json(result);
    });
});

router.route('/potd').get(async function (req, res)
{
    dbo.getDb('squordle')
       .collection('pokemon')
       .aggregate([{ $project: { _id: 0 } }, 
                   { $match: { potd: 'TRUE'  } },
                   { $sort:  { lastModified: -1 } },
                   { $limit: 1 }
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching pokemon of the day');
           else
               res.json(result);
    });
});

// USERS -----------------------------------------------------------------------
router.route('/userList').get(async function (req, res) 
{
    dbo.getDb('squordle')
       .collection('users')
       .aggregate([{ $project: { _id: 0 } },
                   { $match: { } },
                   { $sort:    { 'username': 1 } } 
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching users');
           else
               res.json(result);
        });
});

router.route('/signUp').post(async function (req, res) {
    const users = dbo.getDb('squordle').collection('users');
    let user = req.body
    const newUser = { name: user["user"],
                   password: user["pass"],
                   inventory: user["inventory"],
                   pokeDollars: user["pokeDollars"],
                   region: user["region"],
                   shuckleInfo: user["shuckleInfo"],
                   created: new Date() }

    users
    .aggregate([{ $project: { _id: 0 } },
                { $match: { name: user["user"] } }
                ])
    .toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.json(false);
        } else {
            res.json(true);
            users.insertOne(newUser);
        }
    })
});

router.route('/signIn').post(async function (req, res) {
    let users = await dbo.getDb('squordle').collection('users');
    let user = req.body;

    users
    .aggregate([{ $project: { _id: 0 } },
                { $match: { name: user["user"],
                            password: user["pass"] } }
                ])
    .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
    
    users.updateOne({ name: user["user"] }, 
                    { $set: { 
                            saveKey: user['saveKey'],
                            lastLogin: new Date()
                            }
                    });
});

router.route('/saveData').post(async function (req, res) {
    let users = await dbo.getDb('squordle').collection('users');
    let user = req.body;

    users
    .aggregate([{ $project: { _id: 0 } },
                { $match: { name: user["user"],
                            saveKey: user["saveKey"] } }
                ])
    .toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    });

    users.updateOne({ name: user["user"], saveKey: user["saveKey"] }, 
                    { $set: { 
                            inventory: user["inventory"],
                            pokeDollars: user["pokeDollars"],
                            region: user["region"],
                            shuckleInfo: user["shuckleInfo"],
                            lastModified: new Date()
                            }
                    });
});

module.exports = router;
