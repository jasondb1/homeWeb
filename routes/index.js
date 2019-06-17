const express = require('express');
const router = express.Router();
const Gpio = require('onoff').Gpio;

//LED light
const led = new Gpio(4, 'out');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Turn led on
router.get('/led_on', (req, res, next) => {
	led.writeSync(1);
	res.send('LED ON');
});

//turn led off
router.get('/led_off', (req, res, next) => {
	led.writeSync(0);
	res.send('LED OFF');
});




module.exports = router;
