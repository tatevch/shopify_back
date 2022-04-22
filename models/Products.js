import { DataTypes, Model } from 'sequelize'
import db from '../helpers/db'

class Products extends Model {

}

Products.init({
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
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  body_html: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vendor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  handle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin_graphql_api_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
  sequelize: db,
  modelName: 'products',
  tableName: 'products'
})
export default Products
