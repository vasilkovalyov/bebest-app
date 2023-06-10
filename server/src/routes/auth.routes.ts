import express from 'express';
import loginController from '../controllers/login.controller';
import userLoginMiddleware from '../middleware/user-login.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/login', userLoginMiddleware, loginController.login);
router.get('/is-auth', authMiddleware, loginController.isAuth);
// authMiddleware
export default router;
