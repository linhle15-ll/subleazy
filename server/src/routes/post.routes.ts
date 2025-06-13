import { Router } from 'express';
import postController from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/create', postController.createPost);
router.post('/search', postController.searchPosts);
router.get('/getByUserId/:id', postController.getPostsByUserId);

router.get('/:postId', postController.getPost);
router.put('/edit/:postId', postController.editPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

export default router;
