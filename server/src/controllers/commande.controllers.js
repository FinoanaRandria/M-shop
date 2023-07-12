const con = require("../config/db");
require('dotenv').config();

exports.commande = (req, res) => {
  const { panierDatas } = req.body;
  const userId = req.params.userId;
  const nom = req.params.nom;
  const email = req.params.email;
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

  // Vérifiez que les données sont présentes
  if (!panierDatas) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  // Effectuez l'insertion des données dans la table appropriée
  const query =
    "INSERT INTO commande (nom_produit, prix_unitaire, nombre, userId, nom, email, date) VALUES ?";
  const values = panierDatas.map((panierData) => [
    panierData.name,
    panierData.prix,
    panierData.nombre,
    userId,
    nom,
    email,
    formattedDate,
  ]);

  con.query(query, [values], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion des données : ", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'insertion des données" });
    }

    console.log("Données insérées avec succès !");
    return res.status(200).json({ message: "Données insérées avec succès" });
  });
};

exports.getcommande = (req, res) => {
  con.query('SELECT * FROM commande', (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des commandes :", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
    }

    if (result.length === 0) {
      return res.json({ error: "Aucune commande trouvée" });
    }

    res.status(200).json(result);
  });
}

exports.commandeenvoye = (req, res) => {
  const userId = req.params.userId;

  const sql = "SELECT * FROM commande WHERE userId = ?";

  con.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'execution de la requete SQL:", error);
      res.status(500).json({ error: "Erreur lors de la récuperation des commandes." });
    } else {
      res.status(200).json(results);
    }
  });
}

exports.deletecommande = (req,res)=>{
  const {id} = req.params
 con.query(`DELETE FROM commande WHERE id=${id}`,(error,result)=>{
   if(result){
     res.status(200).json(result)
   }else{
     res.send({error:'impossible de supprimer'})
   }
 })
 
}  

exports.livraison = (req, res) => {
    const commandeId = req.params.id;
  
    // Requête SQL pour rechercher la commande par son ID dans la table "commande"
    const rechercheQuery = `SELECT * FROM commande WHERE id = ${commandeId};`;
  
    // Exécution de la requête de recherche
    con.query(rechercheQuery, (err, result) => {
      if (err) {
        console.error("Erreur lors de la recherche de la commande :", err);
        return res.status(500).json({ error: "Erreur lors de la recherche de la commande" });
      }
  
      // Vérification si la commande a été trouvée
      if (result.length === 0) {
        return res.status(404).json({ error: "Commande non trouvée" });
      }
  
      const commande = result[0];
  
      // Récupérer la date de livraison (date actuelle)
      const dateLivraison = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      // Requête SQL pour insérer une nouvelle livraison dans la table "livraison"
      const insertionQuery = `
        INSERT INTO livraison (nom_produit, prix_unitaire, nombre, userId, nom, email, date)
        VALUES ('${commande.nom_produit}', '${commande.prix_unitaire}', '${commande.nombre}', '${commande.userId}', '${commande.nom}', '${commande.email}', '${dateLivraison}');
      `;
  
      // Exécution de la requête d'insertion
      con.query(insertionQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la livraison :", err);
          return res.status(500).json({ error: "Erreur lors de la création de la livraison" });
        }
  
        // Requête SQL pour supprimer la commande de la table "commande"
        const suppressionQuery = `DELETE FROM commande WHERE id = ${commandeId};`;
  
        // Exécution de la requête de suppression
        con.query(suppressionQuery, (err, result) => {
          if (err) {
            console.error("Erreur lors de la suppression de la commande :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de la commande" });
          }
  
          res.json({ message: "Commande livrée avec succès" });
        });
      });
    });
  };

exports.getlivraison = (req, res) => {
    con.query('SELECT * FROM livraison', (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération des livraisons :", err);
        return res.status(500).json({ error: "Erreur lors de la récupération des livraisons" });
      }
  
      if (result.length === 0) {
        return res.json({ error: "Aucune livraison trouvée" });
      }
  
      res.status(200).json(result);
    });
  };

exports.deletelivraison = (req,res)=>{
    const {id} = req.params
   con.query(`DELETE FROM livraison WHERE id=${id}`,(error,result)=>{
     if(result){
       res.status(200).json(result)
     }else{
       res.send({error:'impossible de supprimer'})
     }
   })
   
}  
