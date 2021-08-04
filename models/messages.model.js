module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'message',
    {
      to: {
        type: DataTypes.STRING,
      },
      from: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      time_send: {
        type: DataTypes.TIME,
      },
    },
    {}
  );

  return Messages;
};
