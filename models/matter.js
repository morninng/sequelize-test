'use strict';


// const db = require('../models/index');
const {
  Model
} = require('sequelize');


const {MatterType} = require('./mattertype');

const {MatterTypeReference} = require('./mattertypereference');

class Matter extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    // console.log(MatterTypes);
    // MatterType.hasMany(Matter, {
    //   foreignKey: 'matterTypeId',
    // })

    // Matter.belongsTo(MatterType)
    Matter.belongsTo(MatterTypeReference)

  }
};


const factory = (sequelize, DataTypes) => {
  Matter.init({
    firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    nickname: DataTypes.STRING,
    matterType: DataTypes.STRING,
    matterTypeId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: MatterType, // Can be both a string representing the table name or a Sequelize model
      //   key: 'id'
      // }
    },
    matterTypeReferenceId:  {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Matter',
  });
  return Matter;
};


module.exports = {factory, Matter};