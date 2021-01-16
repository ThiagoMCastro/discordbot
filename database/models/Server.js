const { DataTypes, Model } = require('sequelize')

module.exports = class User extends Model {
    static init(sequelize){
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            ids: {type: DataTypes.STRING},
            prefixo: {
                type: DataTypes.STRING,
                defaultValue: 'd.'
            }

        }, {
            tableName: 'servers',
            timestamps: false,
            sequelize
        })
    }


}