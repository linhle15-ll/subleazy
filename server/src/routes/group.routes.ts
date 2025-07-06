import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import groupController from '../controllers/group.controller';

const router = Router();

router.use(authenticate);

router.post('/create', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.put('/:groupId/add-members', groupController.addMembers);
router.put('/:groupId/leave', groupController.leaveGroup);

export default router;
