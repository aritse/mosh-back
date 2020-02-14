const bcrypt = require('bcrypt');
​
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
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
            len:[8]
          }
        }
    });
​
    User.associate = models => {
        User.hasOne(models.BasicInfo, { onDelete: "CASCADE" });
        User.hasOne(models.Profile, { onDelete: "CASCADE" });
        User.hasMany(models.Swipe, { onDelete: "CASCADE" });
        User.hasMany(models.Role, { onDelete: "CASCADE" });
        User.hasMany(models.Message, { onDelete: "CASCADE" });
    }

    User.beforeCreate(user=>user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null));
    
    return User;
};