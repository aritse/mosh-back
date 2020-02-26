module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define("Role", {
    role: DataTypes.STRING,
    expertise: {
      type: DataTypes.STRING,
      defaultValue: "Advanced"
    }
  });

  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: "UserRole" });
  };

  return Role;
};

// todo: add validation
