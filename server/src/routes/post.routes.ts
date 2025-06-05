import { Router } from 'express';
import postController from '../controllers/post.controller';
// import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// TODO: Use auth middleware after jwt token is implemented
// router.use(authenticate);

router.post('/create', postController.createPost);
router.post('/search', postController.searchPosts);
router.get('/getByUserId/:id', postController.getPostsByUserId);
router.get('/:postId', postController.getPost);
router.put('/edit/:postId', postController.editPost);

export default router;
