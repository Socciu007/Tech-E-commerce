const express = require('express');
const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get('/getAll', authMiddleware, UserController.getAllUser);
router.get('/get-details/:id', authUserMiddleware, UserController.getDetailsUser);
router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.post('/log-out', UserController.logoutUser);
router.post('/refresh-token', UserController.refreshToken);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
router.post('/delete-many',authMiddleware, UserController.deleteMany);

module.exports = router;