import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:userId', userController.getUser);
export default router;
