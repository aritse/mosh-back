module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return User;
};

// todo: add encryption
// todo: add validation
