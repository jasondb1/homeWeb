const express = require('express');
const router = express.Router();
const Gpio = require('onoff').Gpio;
const sensor = require('node-dht-sensor').promises;
const fs = require('fs');

//TODO:change pins as needed
const LEDPIN = 4;
const TEMPPIN = 17;


//LED light
const led = new Gpio(LEDPIN, 'out');

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
                console.log(`temp: ${res.temperature.toFixed(1)} deg C`
                    + `    humidity: ${res.humidity.toFixed(1)}%`
                    + `    ts:` + new Date().getTime());
                fs.appendFile(
                    "log.csv",
                    new Date().getTime() +
                    "," +
                    temperature.toFixed(2) +
                    "," +
                    humidity.toFixed(2) +
                    "," +
                    elapsed +
                    "\n", function (err) {
                    }
                );

            },
            err => {
                console.error("Failed to read sensor data:", err);
            }
        );
}

setInterval(readTemp(), 5000);


//Turn led on
router.get('/led_on', (req, res, next) => {
    led.writeSync(1);
    res.json({
        led: 'on'
    });
});

//turn led off
router.get('/led_off', (req, res, next) => {
    led.writeSync(0);
    res.json({
        led: 'off'
    });
});


module.exports = router;
