const { usersController } = require('../controllers/users.controller')
const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.get('/users', authMiddleware, usersController.getUsers)
router.post('/users', usersController.registerUser)
router.post('/login', usersController.login)

router.get('/users/current', authMiddleware, (req, res) => {
    // Предполагается, что информация о пользователе хранится в поле req.user после прохождения промежуточного программного обеспечения аутентификации
    const currentUser = req.user;
  
    // Здесь currentUser содержит информацию о текущем пользователе
    res.json(currentUser);
  });

module.exports = router