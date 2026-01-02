import { Router } from 'express';
import wishController from '../controllers/wish.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();

router.use(authenticate);
router.post('/create', wishController.createWish);
router.get('/getByUserId/:id', wishController.getWishListByUserId);
router.get('/matches/:postId', wishController.getMatchesByPost);
router.delete('/:postId/:userId', wishController.deleteWish); 

export default router;
