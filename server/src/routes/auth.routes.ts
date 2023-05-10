import express from 'express';
import LoginController from '../controllers/login.controller';
import userLoginMiddleware from '../middleware/user-login.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/login', userLoginMiddleware, LoginController.login);
router.get('/is-auth', authMiddleware, LoginController.isAuth);
// authMiddleware
export default router;
