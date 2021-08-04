module.exports = (sequelize, Sequelize) => {
  const Messages = sequelize.define('message', {
    to: {
      type: Sequelize.STRING,
    },
    from: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
  });

  return Messages;
};
