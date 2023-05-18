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

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET , { expiresIn: '1d' });
    const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET , { expiresIn: '1d' })

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );
    
    res.cookie('refreshToken', refreshToken, {
      httOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

      res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

// exports.logout = async(req, res) => {
//   const refreshToken = req.cookies.refreshToken
//   if(!refreshToken) return res.sendStatus(204)
//   const user = await User.findAll({
//       where:{
//           refresh_token: refreshToken
//       }
//   })
//   if(!user[0]) return res.sendStatus(204)
//   const userId = user[0].id
//   await User.update({
//     refresh_token : null
//   },
//   {
//     where:{
//       id: userId
//     }
//   }
//   )
//  res.clearCookie('refreshToken')
//  return res.sendStatus(200)
// }
exports.logout = async (req, res) => {
  try {
    // Hapus cookie refreshToken
    res.clearCookie('refreshToken');

    // Logika lain yang mungkin diperlukan saat logout

    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging out' });
  }
};