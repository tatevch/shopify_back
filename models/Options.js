import { DataTypes, Model } from 'sequelize'
import db from '../helpers/db'

class Options extends Model {

}

Options.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  /* source_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    }, */
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  value: {
    type: DataTypes.JSON,
    allowNull: true
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
},
{
  sequelize: db,
  modelName: 'options',
  tableName: 'options'
})

export default Options
/* "options": {
    "id": 594680422,
    "product_id": 632910392,
    "name": "Color",
    "position": 1,
    "values": [
      "Pink",
      "Red",
      "Green",
      "Black"
    ]
  }, */
/* value: {
    type: dataType.STRING,
    set(val) {
      this.setDataValue("value", JSON.stringify(val ?? ""));
    },
  },

  JSON.parse(value)
  */
