const { OwnersModel, UsersModel } = require("../models")

const getAllOwnersLogic = async () => {
    const owners = await OwnersModel.findAll({
        include: {
            model: UsersModel
        }
    })
    return owners.map(owner => {
        return {
            id: owner.id,
            userId: owner.userId,
            user: {
                id: owner.user.id,
                dni: owner.user.dni,
                name: owner.user.name,
                lastName: owner.user.lastName,
                birthdate: owner.user.birthdate,
                email: owner.user.email,
                password: owner.user.password,
                cellPhone: owner.user.cellPhone,
                profilePicture: owner.user.profilePicture,
                address: owner.user.address,
                role: owner.user.role,
                province: owner.user.province?.name,
                provinceId: owner.user.provinceId,
            }
        }
    })
}

const getOwnerLogic = async (id) => {
    const owner = await OwnersModel.findDataById(id)
    if (!owner) throw Error("User not found")
    return owner
};

const postOwnerLogic = async (data) => {
    const { idUser } = data
    const user = await UsersModel.findOneData(idUser)
    if (user.role == 1) {
        const newOwner = await OwnersModel.create(data);
        await newOwner.setUser(user);
        return user
    }
    return
    //   return {
    //     success: 'The user was created successfully.'
    //   }
}

const updateOwnerLogic = async (id, data) => {
    await OwnersModel.updateData(id, data)
    return {
        success: 'User was update correctly.'
    }
}
const deleteOwnerLogic = async (id, data) => {
    await OwnersModel.removeData(id)
    return {
        success: 'User was deleted correctly.'
    }
}

module.exports = {
    getAllOwnersLogic,
    getOwnerLogic,
    postOwnerLogic,
    updateOwnerLogic,
    deleteOwnerLogic
};
