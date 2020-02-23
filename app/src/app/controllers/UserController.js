import User from '../models/User';
import Post from '../models/Post';
import moment from 'moment';

export default {
  async index (req, res) {
    const { user_id } = req.session;

    const user = await User.findByPk(user_id);
    const loadPosts = await Post.findAll({
      include: { association: 'category_post' },
      where: { author: user.id },
      order: ['createdAt']
    });

    const since = moment(user.createdAt).format('DD/MM/YYYY hh:mm:ss');
    const posts = loadPosts.map(post => {
      const { id, tag, title, content } = post;
      return {
        id,
        tag,
        title,
        content,
        category: post.category_post.title,
        createdAt: moment(post.createdAt).format('DD/MM/YYYY hh:mm:ss'),
        updatedAt: moment(post.updatedAt).fromNow()
      }
    });

    return res.status(200).render('pages/home', { user, posts, since });
  },

  async show (req, res) {
    const { id, tag } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(500).redirect(`/home`);
      }

      const loadPosts = await Post.findAll({
        include: { association: 'category_post' },
        where: { author: id }
      });

      const posts = loadPosts.map(post => {
        const { id, tag, title, content } = post;
        return {
          id,
          tag,
          title,
          content,
          category: post.category_post.title,
          createdAt: moment(post.createdAt).format('DD/MM/YYYY hh:mm:ss'),
          updatedAt: moment(post.updatedAt).fromNow()
        }
      });

      return res.status(200).render('pages/post/show', { user, posts });
    } catch(err) {
      req.flash('blogError', [
        'Error to load blog.'
      ]);
      return res.status(500).redirect(`/blog/${id}/${tag}`);
    }
  },

  async login (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('loginError', [
          `User not found to email: ${email}`
        ]);
        return res.status(404).redirect('/');
      }

      if (!await user.validatePassword(password)) {
        req.flash('email', email);
        req.flash('loginError', [
          `Password is incorrect.`
        ]);
        return res.status(401).redirect('/');
      }

      req.session.user_id = user.id;
      return res.status(200).redirect('/home');
    } catch (err) {
      req.flash('loginError', [
        'Error when trying login.'
      ]);
      return res.status(500).redirect('/');
    }
  },

  async logout (req, res) {
    try {
      req.session.user = undefined;
      res.clearCookie('user_sid');
    } catch (err) {
      console.log(err);
    } finally {
      return res.status(200).redirect('/');
    }
  },

  async store (req, res) {
    const { name, email, password } = req.body;

    try {
      if (await User.findOne({ where: { email } })) {
        req.flash('registerError', [
          `User already exists to email: ${email}`
        ]);
        return res.status(409).redirect('/register');
      }

      const user = await User.create({
        name,
        email,
        password,
        tag: name
      });

      req.session.user_id = user.id;
      return res.status(201).redirect('/home');
    } catch (err) {
      console.log(err);
      req.flash('registerError', [
        'Error when trying to register, please try again later.'
      ]);
  
      return res.status(500).redirect('/register');
    }
  },

  async update (req, res) {
    const { user_id } = req.session;
    const { name, email } = req.body;

    try {
      const userExists = await User.findOne({ where: { email } });

      if (userExists && userExists.id !== user_id) {
        req.flash('updateError', [
          `User already exists to email: ${email}`
        ]);
        return res.status(409).redirect('/home');
      }

      const user = await User.findByPk(user_id);

      user.name = name;
      user.email = email;
      user.tag = name;

      await user.save();

      return res.status(200).redirect('/home');
    } catch (err) {
      req.flash('updateError', [
        `Error when trying update account.`
      ]);
      return res.status(500).redirect('/home');
    }
  },

  async destroy (req, res) {
    const { user_id } = req.session;

    try {
      await User.destroy({ where: { id: user_id } });

      return res.status(204).redirect('/');
    } catch (err) {
      req.flash('destroyError', [
        `Error when trying destroy account.`
      ]);
      return res.status(500).redirect('/');
    }
  }
}
