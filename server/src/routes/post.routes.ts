import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', postController.getAllPosts);

router.use(authenticate);

router.post('/create', postController.createPost);
router.get('/:postId', postController.getPost);
router.put('/edit/:postId', postController.editPost);
router.post('/search', postController.searchPosts);
router.get('/getByUserId/:userId', postController.getPostsByUserId);

export default router;
