const {DataTypes} = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'caregivers_images'
const config = { 
  timestamps: true, // createAt, updateAt
  freezeTableName: true
}
const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const CaregiversImagesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
CaregiversImagesModel['findAllData'] = () => {
  return CaregiversImagesModel.findAll()
}
CaregiversImagesModel['findOneData'] = (id) => {
  return CaregiversImagesModel.findByPk(id)
}
CaregiversImagesModel['updateData'] = (id, body) => {
  return CaregiversImagesModel.update(body, { where: {id} })
}
CaregiversImagesModel['removeData'] = (id) => {
  return CaregiversImagesModel.destroy({ where: {id} })
}

module.exports = CaregiversImagesModel