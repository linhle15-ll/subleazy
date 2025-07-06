import { Router } from 'express';
import contractController from '../controllers/contract.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/create', contractController.createContract);
router.put('/edit/:contractId', contractController.editContract);
router.get('/by-post/:postId', contractController.getContractByPostId);
router.delete('/:contractId', contractController.deleteContract);

export default router;
