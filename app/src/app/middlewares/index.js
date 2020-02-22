export default {
  session (req, res, next) {
    if (req.session.user_id && req.cookies.user_sid) {
      return next();
    }
    return res.status(401).redirect('/');
  }
};
