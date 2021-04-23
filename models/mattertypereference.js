'use strict';
const {
  Model
} = require('sequelize');


class MatterTypeReference extends Model {
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

  MatterTypeReference.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MatterTypeReference',
  });
  return MatterTypeReference;
};

module.exports = {factory, MatterTypeReference}

