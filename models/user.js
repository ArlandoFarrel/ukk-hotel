'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.hasMany(models.pemesanan, {
        foreignKey: 'id_user', as: 'pemesanan'
      })
    }
  }
  user.init(
    {
      nama_user: {
        type: DataTypes.STRING,
        allowNull: false
      },
      foto: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'resepsionis'),
        allowNull: false
      }
    }, {
          sequelize,
    modelName: 'user',
  });
  return user;
};