module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define("Profile", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    age: DataTypes.INTEGER
  });

  Profile.associate = models => Profile.belongsTo(models.User);

  return Profile;
};

// todo: add validation
