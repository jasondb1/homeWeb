const express = require('express');
const router = express.Router();
const Gpio = require('onoff').Gpio;

//LED light
const led = new Gpio(4, 'out');
//const pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Turn led on
router.get('/led_on', (req, res, next) => {
	led.write(1, err => { // Asynchronous write
		if (err) {
			throw err;
		}
	});
	//led.writeSync(1);
	res.json({status:'LED ON'});
});

//turn led off
router.get('/led_off', (req, res, next) => {
	led.write(0, err => { // Asynchronous write
		if (err) {
			throw err;
		}
	});
	//led.writeSync(0);
	res.json({status:'LED OFF'});
});

router.get('status', (req, res, next) => {

	let stat = {};

	led.read()
		.then(value => stat[led] = value )
		.catch(err => console.log(err));


});



module.exports = router;
