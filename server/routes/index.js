const express = require('express');
const router = express.Router();
const Gpio = require('onoff').Gpio;

//LED light
const led = new Gpio(4, 'out');

//const heroesService = require('../hero-service');

router.get('/heroes', (req, res) => {
  console.log('get heroes')
  //heroesService.get(req, res);
});

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

router.put('/hero', (req, res) => {
  //heroesService.create(req, res);
});

router.post('/hero', (req, res) => {
  //heroesService.update(req, res);
});

router.delete('/hero/:id', (req, res) => {
  //heroesService.destroy(req, res);
});

module.exports = router;
