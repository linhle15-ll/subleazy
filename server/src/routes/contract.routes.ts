import { Router } from 'express';
import contractController from '../controllers/contract.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/create', contractController.createContract);
router.get('/my-contracts', contractController.getMyContracts);
router.get('/:groupId', contractController.getContractByGroupId);
router.put('/update/:groupId', contractController.updateContractByGroupId);
router.delete('/:contractId', contractController.deleteContract);

export default router;
