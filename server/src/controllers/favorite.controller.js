const con = require("../config/db");
const bcrypt = require("bcrypt");
const jswt =require('jsonwebtoken')
var favorite = require('../models/favorite');

require('dotenv').config()
const saltRounds = 10;

var createFavoriteProduct = async (req, res) => {
      var ProductId = req.params.productId;
      const userId = req.user.id;
      var userFavorite = await favorite.findOne({userId})
      if(userFavorite) {
        userFavorite.products.push(ProductId)
        await userFavorite.save;
        console.log(userFavorite);
        return res.status(200).json(userFavorite)

      }
      else{
        
          var favoriteData = {
            userId : req.user.id,
            products : ProductId,
    
          }
          try {
            const createdFavorite = await favorite.create(favoriteData);/* 
            const favorite = await favorite.findOne({userId:userId}).populate("produit"); */
            res.status(200).json(createdFavorite);
          }catch(error){
            throw new Error(error.message);
          }
      }
    /* console.log("User", req.user , "ProductID", ProductId)
    res.send("Mandeha tsy leizy") */

   
   
  }
 
  var getFavoriteProduitOfUser = async (req, res) => {
    
    try {
    
    const userId = req.user.id;
    const favorites = await favorite.findOne({userId:userId}).populate("products")
    res.status(200).json(favorites);
    } catch (error) {
        throw new Error(error);
    }
  }

  module.exports = { createFavoriteProduct , getFavoriteProduitOfUser}