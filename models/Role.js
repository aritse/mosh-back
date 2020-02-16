module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define("Role", {
    role: DataTypes.STRING,
    expertise: DataTypes.STRING
  });

  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: "UserRole" });
  };

  return Role;
};

// todo: add validation
