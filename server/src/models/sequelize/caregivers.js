const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")
const UsersModel = require(`./users`)
const addMethods = require("../utils/addStaticMethods")

const name = 'caregivers'
const config = { 
  timestamps: false, // createAt, updateAt
  freezeTableName: true
}
const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  experiencies: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  myHouse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}

const CaregiversModel = sequelize.define(name, schema, config)

// Add relationship
UsersModel.hasOne(CaregiversModel)
CaregiversModel.belongsTo(UsersModel)

// add static methods (functions) to model
addMethods(CaregiversModel)

CaregiversModel["findAllCaregivers"] = async () => {
  const caregivers = await CaregiversModel.findAll({
    include:{
      model: UsersModel
    }
  })
  return caregivers
}

CaregiversModel["findCaregiver"] = async (id) => {
  const caregiver = await CaregiversModel.findOne({
    where: { id },
    include: [
      {
        model: UsersModel
      }
    ]
  })
  return caregiver
}

module.exports = CaregiversModel
