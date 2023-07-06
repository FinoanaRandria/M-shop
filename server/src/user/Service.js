var userModel = require('../models/Produit');

module.exports.getDataFromDBService = () => {
  return userModel.find({}).exec();
}

module.exports.createUserDBService = (userDetails) => {
  var userModelData = new userModel();
  userModelData.name = userDetails.name;
  userModelData.categorie = userDetails.categorie;
  userModelData.description = userDetails.description;
  userModelData.prix = userDetails.prix;
  userModelData.image = userDetails.image; // Ajoutez le champ de l'image

  return userModelData.save();
}

module.exports.updateUserDBService = (id, userDetails) => {
  console.log(userDetails);
  return userModel.findByIdAndUpdate(id, userDetails, { new: true }).exec();
}

module.exports.removeUserDBService = (id) => {
  return userModel.findByIdAndDelete(id).exec();
}
