const express = require('express');
const Car = require('../models/car');
const ServiceEntry = require('../models/serviceEntry');
const router = express.Router();

router.get('/cars', (req, res) => {
  Car.fetchAll(req.session.userId)
    .then((cars) => {
      res.render('../views/cars', { cars: cars });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/cars/:id', (req, res) => {
  const carId = req.params.id;

  Car.findById(carId)
    .then((car) => {
      ServiceEntry.fetchAll(carId)
        .then((serviceEntries) => {
          res.render('cars/show', { car: car, serviceEntries: serviceEntries });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/cars/new', (req, res) => {
  res.render('cars/new');
});

router.post('/cars', (req, res) => {
  const { name, model } = req.body;

  const car = new Car(name, model, req.session.userId);

  car.save()
    .then(() => {
      res.redirect('/cars');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
