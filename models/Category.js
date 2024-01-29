const mongoose = require('mongoose');
let Category;

try {
  Category = mongoose.model('Category');      //Check if already exists
} catch (error) {
  const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });
  Category = mongoose.model('Category', categorySchema);
}
module.exports = Category;
