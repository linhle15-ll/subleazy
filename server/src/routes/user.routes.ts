import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:userId', userController.getUser);
router.get('/search', userController.searchUsers);

// Lifestyle
router.get('/:userId/lifestyle', userController.getLifestyle);
router.patch('/:userId/lifestyle', userController.createOrUpdateLifestyle);

export default router;
