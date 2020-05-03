const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const DBTABLE = 'sensor_data';

//open database
//const db = new sqlite3.Database('./db/homeweb.db', (err) => {
//	if (err) {
//		console.error(err.message);
//	}
//	//console.log('Connected to the homeWeb database.');
//});


//db.serialize(function() {
//	db.run("CREATE TABLE if not exists user_info (username VARCHAR NOT NULL, password VARCHAR, email VARCHAR);");
//
//
//});

//db.close();

//TODO: insert, query, 



/////////////////////////////
// /status
// returns the status

//status
router.get('/status', (req, res) => {
    res.json('isLoggedIn');

});

module.exports = router;
