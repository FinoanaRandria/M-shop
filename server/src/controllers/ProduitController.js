var produitService = require('./Service');
const mongoose = require('mongoose'); 
var Produit = require( "../models/Produit");

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });  

var getProduitByIdController = async (req, res) => {
  try {
    var produitId = req.params.id;

    var produit = await produitService.getProduitByIdFromDBService(produitId);

    if (produit) {
      res.send({ "status": true, "data": produit });
    } else {
      res.send({ "status": false, "message": "Produit not found" });
    }
  } catch (error) {
    console.error(error);
    res.send({ "status": false, "message": "Error retrieving produit" });
  }
}

module.exports = { getProduitControllerfn, createproduitControllerFn, updateproduitController, deleteproduitController, getProduitByIdController };


var getProduitControllerfn = async (req, res) => {
  var empolyee = await produitService.getProduitFromDBService();
  res.send({ "status": true, "data": empolyee });
}

var createproduitControllerFn = async (req, res) => {
  try {
    var produitDetails = req.body;
    produitDetails.image = req.file.filename;

    var status = await produitService.createproduitDBService(produitDetails);

    if (status) {
      res.send({ "status": true, "message": "produit created successfully" });
    } else {
      res.send({ "status": false, "message": "Error creating produit" });
    }
  } catch (error) {
    console.error(error);
    res.send({ "status": false, "message": "Error creating produit" });
  }
}

var updateproduitController = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  var result = await produitService.updateproduitDBService(req.params.id, req.body);

  if (result) {
    res.send({ "status": true, "message": "produit Updated" });
  } else {
    res.send({ "status": false, "message": "produit Update Failed" });
  }
}

var deleteproduitController = async (req, res) => {
  console.log(req.params.id);
  var result = await produitService.removeproduitDBService(req.params.id);
  if (result) {
    res.send({ "status": true, "message": "produit Deleted" });
  } else {
    res.send({ "status": false, "message": "produit Deletion Failed" });
  }
}

module.exports = { getProduitByIdController, getProduitControllerfn, createproduitControllerFn, updateproduitController, deleteproduitController };
