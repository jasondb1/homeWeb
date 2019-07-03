const express = require('express');
const router = express.Router();
//const sqlite3 = require('sqlite3').verbose();
const userService = require('userService');

// //open database
// const db = new sqlite3.Database('./db/homeweb.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     //console.log('Connected to the homeWeb database.');
// });
//
//
// db.serialize(function () {
//     db.run("CREATE TABLE if not exists user_info (username VARCHAR NOT NULL, password VARCHAR, email VARCHAR);");
//
//
// });
//
// db.close();
//
//
// /////////////////////////////
// // createUsersTable
//
// const createUsersTable = () => {
//     const sqlQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//         id integer PRIMARY KEY,
//         name text,
//         email text UNIQUE,
//         password text)`;
//
//     return db.run(sqlQuery);
// };

// /////////////////////////////
// // findUserByEmail
//
// const findUserByEmail = (email, cb) => {
//     return db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
//         cb(err, row)
//     });
// };
//
// /////////////////////////////
// // findUser
//
// const findUser = (username, cb) => {
//     return db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
//         cb(err, row)
//     });
// };
//
// /////////////////////////////
// // createUser
//
// const createUser = (user, cb) => {
//     return db.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', user, (err) => {
//         cb(err)
//     });
// };


/////////////////////////////
// get user

router.get('/', (req, res) => {

    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));

    //res.status(200).send({ access_token:  '' });
});

/////////////////////////////
// register user

router.post('/authenticate', (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));

    //401 if not auth
    //return
    // id: user.id,
    // 	username: user.username,
    // 	firstName: user.firstName,
    // 	lastName: user.lastName


});


/////////////////////////////
// register user

router.post('/register', (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.get('/current', (req, res, next) => {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
});


module.exports = router;
