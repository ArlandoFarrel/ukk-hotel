const User = require('../models/index').user

const jwt = require('jsonwebtoken')

const refreshToken = async(req, res) =>
{
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)
        const user = await User.findAll({
            where:{
                refresh_token: refreshToken
            }
        })
        if(!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403)
            const userId = user[0].id
            const nama_user = user[0].nama_user
            const email = user[0].email
            const accesToken = jwt.sign({userId, nama_user, email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
            res.json({accesToken})
        })

    }catch(error) {
        console.log(error)
    }
}

module.exports = {
    refreshToken,
  };