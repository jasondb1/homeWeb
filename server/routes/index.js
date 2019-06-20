const express = require('express');
const router = express.Router();
const Gpio = require('onoff').Gpio;
const sensor = require('node-dht-sensor').promises;
const fs = require('fs');

let currentStatus = { temperature: null, 
	humidity: null, 
	led: null,
	ts: null};

//TODO:change pins as needed
const LEDPIN = 4;
const TEMPPIN = 17;
const SAMPLEINTERVAL = 10 //interval in seconds

//LED light
const led = new Gpio(LEDPIN, 'out');

//TODO:do an initialization and update the currentStatus


//temperature sensor

sensor.setMaxRetries(10);
//sensor.initialize(22, TEMPPIN);
sensor.initialize({
    test: {
        fake: {
            temperature: 21,
            humidity: 60
        }
    }
});

function readTemp() {
    sensor.read(22, TEMPPIN)
        .then(res => {
		let datetime = new Date();
		console.log(res);
                console.log(`temp: ${res.temperature.toFixed(1)} deg C`
                    + `    humidity: ${res.humidity.toFixed(1)}%`
                    + `    ts:` + datetime.toLocaleString());
		
		currentStatus.temperature = res.temperature.toFixed(1);
		currentStatus.humidity = res.humidity.toFixed(2);

                fs.appendFile(
                    "log.csv",
                    datetime.getTime() + 
		    "," +
		    datetime.toLocaleDateString() +
                    "," +
		    datetime.toLocaleTimeString() +
		    "," +
                    res.temperature.toFixed(2) +
                    "," +
                    res.humidity.toFixed(2) +
                    "\n", function (err) {
                    }
                );

            },
            //err => {
            //    console.error("Failed to read sensor data:", err);
            //}
        )
	.catch (err => {
		console.error('failed to read sensor data:', err);
	})
	;
}

setInterval(function () {readTemp();}, (SAMPLEINTERVAL * 1000));

//status
router.get('/status', (req, res) => {
    	currentStatus.ts = new Date().getTime();
	res.status(200).json(currentStatus);

});

//Turn led on
router.get('/led_on', (req, res, next) => {
    led.writeSync(1);i
    currentStatus.led = true;
    res.status(200).json({
        led: 'on'
    });
});

//turn led off
router.get('/led_off', (req, res, next) => {
    led.writeSync(0);
    currentStatus.led = false;
    res.status(200).json({
        led: 'off'
    });
});


module.exports = router;
