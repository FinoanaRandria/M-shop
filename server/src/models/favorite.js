var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = mongoose.Schema({
 userId:{type:String},
 products:[{type: mongoose.Schema.Types.ObjectId, ref: "produits"}],

});

module.exports = mongoose.model('favorites', favoriteSchema);
