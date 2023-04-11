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
/*
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
*/

//LOOK AT POTD TRIGGER FOR INSPO
router.route('/signUp').post(async function (req, response) {
    let users = await dbo.getDb('squordle').collection('users');

    let newUser = {
        name: req.body.name,
        password: req.body.password,
        created: new Date()
    }

    users.insertOne(newUser, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//
router.route('/signIn').post(async function (req, res) {
    let user = req.body;
    dbo.getDb('squordle')
       .collection('users')
       //POTD TRIGGER FOR $PROJECT INFO
       .aggregate([{ $project: { _id: 0 } },
                   { $match: { name: user.name,
                               password: user.password } }
                 ])
       .toArray(function (err, result) {
           if (err)
               res.status(400).send('Error fetching user');
           else
               res.json(result);

    });
});

//Save function through MongoDB
//Router.route('/saveData').post(async function (req, response) {
//    
//}

module.exports = router;
