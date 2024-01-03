const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);

    if (user) {
      // Authentication successful
      req.session.userId = user._id;
      next();
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle authentication error
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
