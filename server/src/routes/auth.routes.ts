import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/signup', authController.handleSignUp);
router.post('/login', authController.handleLogIn);
router.post('/refresh', authController.handleRefreshToken);

export default router;
