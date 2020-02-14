module.exports = function(sequelize, DataTypes) {
  const BasicInfo = sequelize.define("BasicInfo", {
    imageUrl: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    catchPhrase: DataTypes.TEXT
  });

  BasicInfo.associate = models => BasicInfo.belongsTo(models.User);

  return BasicInfo;
};

// todo: add validation
