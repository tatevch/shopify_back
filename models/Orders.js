import { DataTypes, Model } from 'sequelize'
import db from '../helpers/db'
class Orders extends Model {

}
Orders.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  source_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    unique: true,
    allowNull: false
  },
  customer_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  product_id: {
    type: DataTypes.JSON,
    allowNull: true
  },
  product_title: {
    type: DataTypes.JSON,
    allowsNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false

  },
  order_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  closed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }

},
{
  sequelize: db,
  modelName: 'orders',
  tableName: 'orders'
})

export default Orders
// product_title:title
