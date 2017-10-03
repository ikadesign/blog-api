var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: String,
  date: String,
  content: String,
  category_id: String,
})

module.exports = mongoose.model('Blog', BlogSchema);