import { Router } from 'express';
import userController from '../controllers/user.controller';
// authentication middleware

const router = Router();

router.get('/:id', userController.getUserById);
export default router;
