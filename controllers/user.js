const { News, User } = require('../models');

const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: {
        model: News,
        as: 'news',
      },
    });
    if (!currentUser) return res.status(400).json({ message: 'USER_NOT_FOUND' });
    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const createUserNews = async (req, res) => {
  try {
    const {
      title,
      text,
      tags,
    } = req.body;

    if (!title?.trim() || !text?.trim() || !tags?.trim()) {
      return res.status(400).json('Invalid data');
    }
    console.log(req.file);
    const news = await News.create({
      title,
      text,
      tags,
      image: req.file?.path.replace('public/', '') || null,
      userId: req.user.id,
    });
    return res.status(200).json(news);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const changeUserInfo = async (req, res) => {
  try {
    const { body: { login }, file = {}, user } = req;

    if (!login?.trim() && !file?.path) {
      return res.status(400).json('Invalid data');
    }

    const editedUser = await user.update({
      login: login || user.login,
      avatar: req.file?.path.replace('public/', '') || null,
    });
    return res.status(200).json(editedUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getCurrentUser,
  createUserNews,
  changeUserInfo,
};
