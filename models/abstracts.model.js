const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abstractSchema = new Schema({ 
    input_url: { type: String, required: false },
    titulo: { type: String, required: false },
    texto: { type: String, required: false },
    tipo: { type: String, required: false },
    corriente: { type: String, required: false }
  })
  
  const Abstract = mongoose.model('Abstract', abstractSchema);

  module.exports = Abstract;