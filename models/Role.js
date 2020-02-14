module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define("Role", {
    role: DataTypes.STRING,
    expertise: DataTypes.STRING
  });

  return Role;
};

// todo: add validation
