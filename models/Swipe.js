module.exports = function(sequelize, DataTypes) {
  const Swipe = sequelize.define("Swipe", {
    swiperId: DataTypes.number,
    swipeeId: DataTypes.number,
    liked: DataTypes.boolean
  });

  Swipe.associate = function(models) {
    Swipe.belongsTo(models.User);
  };

  return Swipe;
};

// todo: add validation
