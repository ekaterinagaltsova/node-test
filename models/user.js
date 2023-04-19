const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.News, {
        foreignKey: 'userId',
        as: 'news',
      });
    }
  }
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    googleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, saltRounds, null);
    }
  });

  User.afterCreate((user) => delete user.dataValues.password);

  User.afterUpdate((user) => delete user.dataValues.password);

  User.prototype.comparePassword = function compare(password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          return rej(err);
        }
        return res(isMatch);
      });
    });
  };
  return User;
};
