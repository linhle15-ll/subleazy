import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/search', postController.searchPosts);

// Protected routes
router.use(authenticate);

router.post('/create', postController.createPost);

export default router;
