import { Router } from 'express';
import UserController from './app/controllers/UserController';

const router = Router();

router.get('/', (req, res) => res.render('pages/home'));

export default router;
