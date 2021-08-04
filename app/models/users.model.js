module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('user', {
    user_id: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
  });

  return Users;
};
