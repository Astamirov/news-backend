const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.usersController = {
    getUsers: async (req, res) => {
        const users = await User.find()

        res.json(users)
    },

    registerUser: async (req, res) => {
        try{
            const { login, password } = req.body
            const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))
            const user = await User.create({ login, password: hash })

            res.json(user)
        } catch (e) {
            res.json({ error: e.message })
        }
    },

    login: async (req, res) => {
        try {
            const { login, password } = req.body
    
            const candidate = await User.findOne({ login })
            
            if(!candidate) {
                return res.status(401).json({error: 'Неверный логин или пароль'})
            }
    
            const valid = await bcrypt.compare(password, candidate.password)
    
            if(!valid) {
                return res.status(401).json({error: 'Неверный пароль'})
            }

            const payload = {
                id: candidate._id,
            }

            const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
                expiresIn: '24h'
            })
    
    
            res.json({token})
        } catch(e) {
            console.log("Ошибка, " + e.message)
        }
    },
}