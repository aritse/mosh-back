module.exports = function(sequelize, DataTypes) {
  const Basic = sequelize.define("Basic", {
    imageUrl: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    catchPhrase: DataTypes.TEXT
  });

  return Basic;
};

// todo: add validation
