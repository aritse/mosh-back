const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    zipcode: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.STRING
  });
  User.associate = models => {
    User.hasOne(models.BasicInfo, { onDelete: "CASCADE" });
    User.hasMany(models.Role, { onDelete: "CASCADE" });
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  User.beforeCreate(user => (user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)));
  User.beforeUpdate(user => (user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)));

  return User;
};
