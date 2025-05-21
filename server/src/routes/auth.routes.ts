import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/signup', authController.handleSignUp);

export default router;