import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/create', postController.createPost);
router.post('/search', postController.searchPosts);

export default router;
