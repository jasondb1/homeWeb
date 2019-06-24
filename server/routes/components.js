const express = require('express');
const router = express.Router();
const Gpio = require('onoff').Gpio;
const dht_sensor = require('node-dht-sensor').promises;
const fs = require('fs');
const i2c = require('i2c-bus');
const i2c_bus = i2c.openSync(1);

//i2c comm settings for arduino
let arduino_i2cAddress = 0x08;
let arduino_data_length = 0x20;
let buffer_arduino = Buffer.alloc(arduino_data_length, 0x00);

//Set Raspberry Pi pins
const LEDPIN = 4;
const RELAY1PIN = 18;
const RELAY2PIN = 23;

const TEMPPIN = 17;
const SAMPLEINTERVAL = 10; //interval in seconds to sample temperature and humidity

//components
let component = {};
let currentStatus = {
    temperature: null,
    humidity: null,
    led: null,
    ts: null,
    arduino: null,
    relay1: null,
    relay2: null,

};

let LED = new Gpio(LEDPIN, 'out');
let RELAY1 = new Gpio(RELAY1PIN, 'out');
let RELAY2 = new Gpio(RELAY2PIN, 'out');


initialize();


/////////////////////////////
// initialize

function initialize() {

    component = {
        led: {
            pin: LED,
            name: 'LED',
            status: LED.readSync(),
        },
        relay1: {
            pin: RELAY1,
            name: 'Relay 1',
            status: RELAY1.readSync(),
        },
        relay2: {
            pin: RELAY2,
            name: 'Relay 2',
            status: RELAY2.readSync(),
        },

    };
}


//temperature sensor (currently in simulation mode
dht_sensor.setMaxRetries(10);
//sensor.initialize(22, TEMPPIN);
dht_sensor.initialize({
    test: {
        fake: {
            temperature: 21,
            humidity: 60
        }
    }
});


/////////////////////////////
// readTemp

function readTemp() {
    dht_sensor.read(22, TEMPPIN)
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
        .catch(err => {
            console.error('failed to read sensor data:', err);
        });
}

/////////////////////////////
// readArduino

function readArduino() {
    i2c_bus.i2cReadSync(arduino_i2cAddress, arduino_data_length, buffer_arduino);
    string = buffer_arduino.toString();
    let vals = string.split(/[\s,\0]+/, 3);
    currentStatus.light = vals[0];
    currentStatus.temp1 = vals[1];
    currentStatus.humidity1 = vals[2];
    console.log(string.split(/[\s,\0]+/, 3));

}

/////////////////////////////
// readSensors

function readAllSensors() {
    readTemp();
    readArduino();
}


setInterval(function () {
    readAllSensors();
}, (SAMPLEINTERVAL * 1000));

/////////////////////////////
// /status
// returns the status

//status
router.get('/status', (req, res) => {
    currentStatus.ts = new Date().getTime();
    res.status(200).json(currentStatus);

});


/////////////////////////////
// /component_state
// returns the component state

router.get('/component/:id', (req, res) => {
	console.log('GET component');
	console.log(req.params);

    let comp = req.params.id;
	console.log({status: component[comp].status});
    res.json({status: component[comp].status});
});

/////////////////////////////
// /component_on
// returns the component state

router.post('/component_on/:id', (req, res) => {
    let comp = req.params.id;
	console.log('component_on:' +comp);
   console.log(req.params);

console.log(component[comp]);
    component[comp].pin.writeSync(1);
    component[comp].status = true;
    currentStatus[comp] = true;
    res.json({status: true});

});

/////////////////////////////
// /component_off
// returns the component state

router.post('/component_off/:id', (req, res) => {

    let comp = req.params.id;
    component[comp].pin.writeSync(0);
    component[comp].status = false;
    currentStatus[comp] = false;
    res.json({status: true});

});


module.exports = router;
