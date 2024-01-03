const Car = require('../models/car');

module.exports = {
  getCars: async (req, res) => {
    try {
      // Fetch cars for the logged-in user
      const cars = await Car.find({ userId: req.session.userId });
      res.json(cars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  addCar: async (req, res) => {
    const { name, model } = req.body;

    try {
      // Create a new car for the logged-in user
      const newCar = new Car({ userId: req.session.userId, name, model });
      await newCar.save();

      res.status(201).json({ message: 'Car added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
