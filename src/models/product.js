const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema es una propiedad de mongoose para crear modelos de datos

//Modelo de datos:
const productSchema = new Schema({
    nombre: {
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    precio: {
        type: Number,
    },
    oferta: {
        type: Number,
    },
    cantidad: {
        type: Number,
    },
    descripcion: {
        type:String,
    },

    //Coleccion:
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'detail',
    }]
});

module.exports = mongoose.model('product', productSchema)