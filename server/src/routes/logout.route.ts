import { Router } from 'express';
import { handleLogOut } from '../controllers/logout.controller';

const router = Router();
router.get('/', handleLogOut);

export default router;
