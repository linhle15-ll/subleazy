import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import messageController from '../controllers/message.controller';

const router = Router();

router.use(authenticate);

router.get('/:groupId', messageController.getMessages);
router.post('/:groupId', messageController.sendMessage);

export default router;
