module.exports = function(sequelize, DataTypes) {
  const Swipe = sequelize.define("Swipe", {
    swiperId: DataTypes.number,
    swipeeId: DataTypes.number,
    liked: DataTypes.boolean
  });

  return Swipe;
};

// todo: add validation
