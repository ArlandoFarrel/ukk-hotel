const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User =  require('../models/index').user

const crypto = require('crypto');



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash password menggunakan MD5
    // const hashedPassword = user.password

    // // Periksa kecocokan password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'koderahasia', { expiresIn: '1h' });


    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};
