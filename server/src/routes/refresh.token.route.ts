import { Router } from 'express';
import { refreshAccessToken } from '../controllers/refresh.token.controller';

const router = Router();
router.get('/', refreshAccessToken);

export default router;
