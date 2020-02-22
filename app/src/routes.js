import { Router } from 'express';
import middlewares from './app/middlewares';
import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';

const router = Router();

// pages
router.get('/home', middlewares.session, UserController.index);

// public pages
router.get('/', (req, res) => res.render('pages/login'));
router.get('/register', (req, res) => res.render('pages/register'));
router.get('/blog/:id/:name', (req, res) => res.render('pages/blog'));
router.get('/blog/:id/:name/posts/:title', (req, res) => res.render('pages/post'));

// actions
router.post('/login', UserController.login);
router.post('/register', UserController.store);
router.get('/logout', middlewares.session, UserController.logout);
router.put('/blog/update-account', middlewares.session, UserController.update);
router.delete('/blog/delete-account', middlewares.session, UserController.destroy);

router.post('/posts', PostController.store);
router.put('/posts/update', PostController.update);
router.delete('/posts/delete', PostController.destroy);

export default router;
