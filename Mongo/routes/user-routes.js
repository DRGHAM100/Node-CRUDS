import UserController from '../controllers/user-controller';
import express from 'express';
const router = express.Router();


router.get('/',UserController.getUsers);
router.post('/signup',UserController.signUp);
router.post('/login',UserController.login);


export default router;