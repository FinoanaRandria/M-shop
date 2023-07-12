const { Router } = require("express");
const router = Router();
const { commande,deletecommande,getcommande,livraison,commandeenvoye,getlivraison,deletelivraison } = require("../controllers/commande.controllers");

router.post('/commande/:userId/:nom/:email',commande);

router.get('/commande',getcommande);

router.delete('/commande/:id',deletecommande);

router.post('/commande/livraison/:id', livraison);

router.get('/commandeenvoye/:userId', commandeenvoye);

router.get('/livraison', getlivraison);

router.delete('/livraison/:id', deletelivraison);

module.exports = router;