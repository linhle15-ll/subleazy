import { Router } from 'express';
import wishController from '../controllers/wish.controller';
// import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// TODO: Use auth middleware after jwt token is implemented
// router.use(authenticate);

// router.post('/create', authMiddleware, wishController.createWish);
router.post('/create', wishController.createWish);

export default router;
