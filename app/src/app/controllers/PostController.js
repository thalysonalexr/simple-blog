import Category from '../models/Category';
import Post from '../models/Post';
import User from '../models/User';

export default {
  async index (req, res) {
    const { user_id } = req.session;
    const { tag } = req.params;

    try {
      const post = await Post.findOne({
        include: { association: 'category_post' },
        where: {
          tag,
          author: user_id
        }
      });

      if (!post) {
        return res.status(200).redirect('/home');
      }

      return res.status(200).render('pages/post/update', { post });
    } catch (err) {
      req.flash('postError', [
        'Error on load post.'
      ]);
      return res.status(500).redirect('/home');
    }
  },

  async store (req, res) {
    const { user_id } = req.session;
    const { title, category, content } = req.body;

    try {
      const user = await User.findByPk(user_id);

      let cat = await Category.findOne({
        where: { title: category }
      });

      if (!cat)
        cat = await Category.create({ title: category, description: '' });

      await Post.create({
        title,
        tag: title,
        content,
        category: cat.id,
        author: user.id,
      });

      req.flash('postSucess', 'New post was created.');

      return res.status(201).redirect('/home');
    } catch (err) {
      req.flash('postError', [
        'Error on create post.'
      ]);
      return res.status(500).redirect('/home');
    }
  },

  async update (req, res) {
    const { id, title, category, content } = req.body;

    try {
      let cat = await Category.findOne({
        where: { title: category }
      });

      if (!cat)
        cat = await Category.create({ title: category, description: '' });

      const post = await Post.findByPk(parseInt(id));

      post.title = title;
      post.tag = title;
      post.category = parseInt(cat.id);
      post.content = content;

      await post.save();
      
      return res.status(200).redirect(`/posts/${post.tag}`);
    } catch (err) {
      req.flash('postError', [
        'Error on update post.'
      ]);
      return res.status(500).redirect('/home');
    }
  },

  async destroy (req, res) {
    const { id } = req.body;

    try {
      const post = await Post.findByPk(id);

      await post.destroy();

      return res.status(204).redirect('/home');
    } catch (err) {
      req.flash('postError', [
        'Error on destroy post.'
      ]);
      return res.status(500).redirect('/home');
    }
  }
};
