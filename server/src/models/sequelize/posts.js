const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const BreedsModel = require("./breeds")
const CaregiversModel = require("./caregivers")
const OwnersModel = require("./owners")
const PetsImagesModel = require("./pets_images")
const GendersModel = require("./genders")
const PetsModel = require("./pets")
const ReviewsModel = require("./reviews")
const SpeciesModel = require("./species")
const UsersModel = require("./users")

const addMethods = require("../utils/addStaticMethods")

//toDo:rename model
const name = 'posts'
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
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
}
}

const PostsModel = sequelize.define(name, schema, config)

// Add relationship
OwnersModel.hasMany(PostsModel)
PostsModel.belongsTo(OwnersModel)

PetsModel.hasOne(PostsModel)
PostsModel.belongsTo(PetsModel)

CaregiversModel.hasOne(PostsModel)
PostsModel.belongsTo(CaregiversModel)

// add static methods (functions) to model
addMethods(PostsModel)

PostsModel['findAllOffers'] = () => {
  return PostsModel.findAll({
    attributes: [ "id", "address", "startDate", "endDate" ],
    include: [
      { 
        model: PetsModel,
        attributes: [ "id", "name" ],
        include: [
          {model: PetsImagesModel}, 
          {model:SpeciesModel,  attributes: ["name", "icon"]},
          {model: GendersModel}, 
        ]
      },
      { 
        model: OwnersModel,
        attributes: [ "id", "userId" ],
        include: [{
          model: UsersModel,
          attributes: [ "id", "name" ],
        }]
      }
    ]
  })
}

PostsModel['findOfferById'] = (id) => {
  return PostsModel.findByPk(id, {
    attributes: [ "id", "startDate", "endDate"],
    include: [
      { 
        model: PetsModel,
        attributes: [ 
          "id", "name", "temperaments", "manners", "notes"
        ],
        include: [
          {
            model: PetsImagesModel,
            attributes: ["imageUrl"]
          },
          {
            model: SpeciesModel,
            attributes: ["name", "icon"]
          },
          {
            model: BreedsModel,
            attributes: ["name"]
          },
        ]
      },
      {
        model: OwnersModel,
        attributes: [ "id" ],
        include: [{
          model: UsersModel,
          attributes: [
            "name", "role", "address", "cellPhone", "profilePicture"
          ]
        }]
      }
    ]
  })
}

PostsModel['createData'] = async (data) => {
  return await PostsModel.create(data);
}

module.exports = PostsModel
