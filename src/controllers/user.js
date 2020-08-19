const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

registro: async function(req, res, next) {
    console.log(req.body);
        try{
            let documento = await user.create({ 
                name: req.body.name, 
                username: req.body.username, 
                password: req.body.password,
                documento:req.body.documento,
                mail:req.body.mail })
            res.json(documento)
        }catch(e){
            console.log(e)
            next(e)
        }
    },


login: async function(req, res, next) {
    try{
        let usuario = await user.findOne({username:req.body.username})
        if(usuario){
            

            if(bcrypt.compareSync(req.body.password,usuario.password)){
                const token = jwt.sign({usuario:usuario._id},req.app.get('secretKey'),{expiresIn:'1h'})
                res.json({token:token})
            }else{
                res.json({mensaje:"Contraseña incorrecta"})
            };
            }else{
            res.json({mensaje:"Usuario incorrecto"})
            }

    }catch(e){
        next(e)
    }
},

deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    await user.findByIdAndRemove(userId);
    res.status(200).json({ success: true });
}
}
