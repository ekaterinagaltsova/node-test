const { News, User } = require('../models');

const getNews = async (req, res) => {
  try {
    const news = await News.findAll({
      attributes: { exclude: ['updatedAt'] },
      include: [{
        model: User,
        as: 'user',
        attributes: ['login', 'id'],
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    return res.status(200).send(news);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = getNews;
