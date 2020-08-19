const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const user = require('../controllers/user');
const Schema = mongoose.Schema; //Schema es una propiedad de mongoose para crear modelos de datos

//Para poder realizar operaciones en nuestra bd mongoDB 1º crear el schema.
const userSchema = new Schema({
    name: {
        type: String, 
        trim: true,  
        required: true,
    },
    username: { 
        type: String,
        trim: true,   
        //required: true, 
        //unique: true 
    },
    password: {
        type: String,
        trim: true,   
        required: true},
    documento: {
        type: String, 
        required: true},
    mail: {
        type: String, 
        required: true},
}, {
    timestamps: true
});


userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('users', userSchema);


