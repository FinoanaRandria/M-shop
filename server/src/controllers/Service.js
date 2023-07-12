var produitModel = require('../models/Produit');

module.exports.getProduitByIdFromDBService = (id) => {
  return produitModel.findById(id).exec();
}

module.exports.getProduitFromDBService = () => {
  return produitModel.find({}).exec();
}

module.exports.createproduitDBService = (produitDetails) => {
  var produitModelData = new produitModel();
  produitModelData.name = produitDetails.name;
  produitModelData.categorie = produitDetails.categorie;
  produitModelData.description = produitDetails.description;
  produitModelData.prix = produitDetails.prix;
  produitModelData.image = produitDetails.image; // Ajoutez le champ de l'image

  return produitModelData.save();
}

module.exports.updateproduitDBService = (id, produitDetails) => {
  console.log(produitDetails);
  return produitModel.findByIdAndUpdate(id, produitDetails, { new: true }).exec();
}

module.exports.removeproduitDBService = (id) => {
  return produitModel.findByIdAndDelete(id).exec();
}
