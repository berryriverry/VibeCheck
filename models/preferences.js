const { Model, DataTypes } = require('sequalize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Preferences extends Model {

}

Preferences.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        
        }
    
)

module.exports = Preferences