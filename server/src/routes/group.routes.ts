import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import groupController from '../controllers/group.controller';

const router = Router();

router.use(authenticate);

router.post('/create', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.put('/:groupId/add-members', groupController.addMembers);
router.put('/:groupId/leave', groupController.leaveGroup);
router.put('/:groupId/rename', groupController.renameGroup);
router.put('/:groupId/link-post', groupController.linkPost);
router.get('/:groupId/members', groupController.getGroupMembers);
router.get('/:groupId/post', groupController.getPostIdByGroupId);
router.put('/:groupId/add-contract', groupController.addContractToGroup);

export default router;
