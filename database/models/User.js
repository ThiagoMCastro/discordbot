const { DataTypes, Model } = require('sequelize')

module.exports = class User extends Model {
    static init(sequelize){
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            idd: {type: DataTypes.STRING},
            money: {
                type: DataTypes.BIGINT(11),
                defaultValue: 1000
            },
            xp: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            lvl: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            daily: {
                type: DataTypes.STRING
            },
            frase: {
                type: DataTypes.STRING,
                defaultValue: 'Nenhuma mensagem definida.'
            },
            cover: {
                type: DataTypes.STRING,
                defaultValue: 'https://i.imgur.com/uC5okyD.png'
            }

        }, {
            tableName: 'users',
            timestamps: false,
            sequelize
        })
    }


}