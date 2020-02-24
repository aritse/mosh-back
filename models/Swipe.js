module.exports = function (sequelize, DataTypes) {
  const Swipe = sequelize.define("Swipe", {
    swiperId: DataTypes.INTEGER,
    swipeeId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  });

  // Swipe.associate = function(models) {
  //   Swipe.belongsTo(models.User);
  // };

  return Swipe;
};

// todo: add validation
