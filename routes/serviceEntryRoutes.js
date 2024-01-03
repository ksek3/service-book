const express = require('express');
const ServiceEntry = require('../models/serviceEntry');
const router = express.Router();

router.get('/cars/:carId/service-entries/new', (req, res) => {
  const carId = req.params.carId;

  res.render('serviceEntries/new', { carId: carId, csrfToken: req.csrfToken() });
});

router.post('/service-entries', (req, res) => {
  const { date, workDone, mileage, carId } = req.body;

  const serviceEntry = new ServiceEntry(date, workDone, mileage, carId);

  serviceEntry.save()
    .then(() => {
      res.redirect(`/cars/${carId}`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
