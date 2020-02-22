import { Router } from 'express';
import middlewares from './app/middlewares';
import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';

const router = Router();

// pages
router.get('/home', middlewares.session, UserController.index);
router.get('/posts/:tag', middlewares.session, PostController.index);

// public pages
router.get('/', (req, res) => res.render('pages/login'));
router.get('/register', (req, res) => res.render('pages/register'));
router.get('/blog/:id/:tag', (req, res) => res.render('pages/post/show'));
router.get('/blog/:id/:tag/posts/:title', (req, res) => res.render('pages/post'));

// actions
router.post('/login', UserController.login);
router.post('/register', UserController.store);
router.get('/logout', middlewares.session, UserController.logout);
router.put('/blog/update-account', middlewares.session, UserController.update);
router.delete('/blog/delete-account', middlewares.session, UserController.destroy);

router.post('/posts', middlewares.session, PostController.store);
router.put('/posts/update', middlewares.session, PostController.update);
router.delete('/posts/delete', middlewares.session, PostController.destroy);

export default router;
