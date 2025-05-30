import { Router } from 'express';
import postController from '../controllers/post.controller';
import { NextFunction, Request, Response } from 'express';
// import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// TODO: Use auth middleware after jwt token is implemented
// router.use(authenticate);

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  postController.createPost(req, res, next);
});

router.post('/search', (req: Request, res: Response, next: NextFunction) => {
  postController.searchPosts(req, res, next);
});

router.get(
  '/getByUserId/:id',
  (req: Request, res: Response, next: NextFunction) => {
    postController.getPostsByUserId(req, res, next);
  }
);

export default router;
