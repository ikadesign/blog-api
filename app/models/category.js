var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  category: String,
})

module.exports = mongoose.model('Category', CategorySchema);