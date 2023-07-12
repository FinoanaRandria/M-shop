const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const produitController = require('../controllers/ProduitController');

router.route('/produit/:id').get(produitController.getProduitByIdController);

router.route('/produit').get(produitController.getProduitControllerfn);

router.route('/produit').post(upload.single('image'), produitController.createproduitControllerFn);

router.route('/produit/update/:id').patch(produitController.updateproduitController);

router.route('/produit/delete/:id').delete(produitController.deleteproduitController);

module.exports = router;
