import { Router } from 'express';
import contractController from '../controllers/contract.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/create', contractController.createContract);
router.put('/edit/:contractId', contractController.editContract);
router.get('/by-group/:groupId', contractController.getContractByGroupId);
router.delete('/:contractId', contractController.deleteContract);
router.get('/my-contracts', contractController.getMyContracts);
router.patch('/:contractId/status', contractController.updateContractStatus);

export default router;
