const User = require('../database/models/User.js')

module.exports.getUser = function(id){
    return User.findOne({
        where: {
            idd: id
        }

    }).catch((err) => console.log(`Não foi possivel consultar o usuario ${id} no banco de dados! ${err}`))
}
