module.exports = function(sequelize, DataTypes) {
  const BasicInfo = sequelize.define("BasicInfo", {
    imageUrl: DataTypes.STRING
  });

  BasicInfo.associate = models => BasicInfo.belongsTo(models.User);

  return BasicInfo;
};

// todo: add validation
