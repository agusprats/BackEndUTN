const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
        nombre: String,
        precio: Number,   
        oferta: Number,
        cantidad: Number,
        descripcion: String,
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        }
});


module.exports = mongoose.model('detail', detailSchema);