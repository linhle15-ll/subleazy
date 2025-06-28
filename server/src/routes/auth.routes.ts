import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/signup', authController.handleSignUp);
router.post('/signin', authController.handleSignIn);
router.post('/refresh', authController.handleRefreshToken);
router.post('/signout', authController.handleSignOut);

export default router;

