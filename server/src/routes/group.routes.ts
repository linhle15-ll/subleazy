import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import groupController from '../controllers/group.controller';

const router = Router();

router.use(authenticate);

router.post('/create', groupController.createGroup);
// router.get('/', groupController.getAllGroups)

export default router;
