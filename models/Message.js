module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    dateSent: DataTypes.DATE,
    message: DataTypes.TEXT
  });

  Message.associate = models => Message.belongsTo(models.User);

  return Message;
};

// todo: add encryption
// todo: add validation
