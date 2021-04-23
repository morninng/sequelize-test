'use strict';
const {
  Model
} = require('sequelize');



class Dinasour extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};


const factory = (sequelize, DataTypes) => {
  Dinasour.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dinasour',
  });
  return Dinasour;
};


module.exports = {factory, Dinasour}