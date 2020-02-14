module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    senderId: DataTypes.NUMBER,
    receiverId: DataTypes.NUMBER,
    dateSent: DataTypes.DATETIME,
    message: DataTypes.TEXT
  });

  Message.associate = models => Message.belongsTo(models.User);

  return Message;
};

// todo: add encryption
// todo: add validation
