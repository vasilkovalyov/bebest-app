import express from 'express';
import LoginController from '../controllers/login.controller';
import userLoginMiddleware from '../middleware/user-login.middleware';

const router = express.Router();

router.get('/login', userLoginMiddleware, LoginController.login);

export default router;
