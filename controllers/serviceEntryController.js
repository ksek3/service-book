const ServiceEntry = require('../models/serviceEntry');

module.exports = {
  addServiceEntry: async (req, res) => {
    const { carId, date, workDone, mileage } = req.body;

    try {
      // Create a new service entry for the specified car
      const newServiceEntry = new ServiceEntry({ carId, date, workDone, mileage });
      await newServiceEntry.save();

      res.status(201).json({ message: 'Service entry added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getServiceEntries: async (req, res) => {
    const { carId } = req.params;

    try {
      // Fetch service entries for the specified car
      const serviceEntries = await ServiceEntry.find({ carId });
      res.json(serviceEntries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
