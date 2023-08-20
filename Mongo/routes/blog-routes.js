import BlogController from '../controllers/blog-controller';
import express from 'express';
const router = express.Router();


router.get('/',BlogController.getAllBlogs);
router.get('/:id',BlogController.getBlog);
router.post('/add',BlogController.addBlog);
router.put('/update/:id',BlogController.updateBlog);
router.delete('/:id',BlogController.deleteBlog);
router.get('/user/:id',BlogController.getByUserId);

export default router;