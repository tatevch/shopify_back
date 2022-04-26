import { DataTypes, Model } from 'sequelize'
import db from '../helpers/db'
import Products from './Products'

class Variants extends Model {

}

Variants.init({
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
  product_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: true
  },
  option1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  option2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  option3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inventory_item_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  }
  /* inventory_quantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  } */
},
{
  sequelize: db,
  modelName: 'variants',
  tableName: 'variants'
})

/* Variants.belongsTo(Products, {
  foreignKey: 'product_id',
  targetKey: 'source_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'products'
}) */
Variants.belongsTo(Products, {
  foreignKey: 'product_id',
  targetKey: 'source_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'products'
})
Products.hasMany(Variants, {
  foreignKey: 'product_id',
  sourceKey: 'source_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'variants'
})

export default Variants

/*
Ship.belongsTo(Captain, { targetKey: 'name', foreignKey: 'captainName' });
Bar.hasMany(Baz, { sourceKey: 'title', foreignKey: 'barTitle' });

                    ""id": 42820014473439,
                    "product_id": 7653853757663,
                    "title": "Medium / Black / Syntethic",
                    "price": "5000.00",
                    "sku": "DTO-M-2",
                    "position": 2,
                    "inventory_policy": "continue",
                    "compare_at_price": null,
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Medium",
                    "option2": "Black",
                    "option3": "Syntethic",
                    "created_at": "2022-03-31T17:06:18+04:00",
                    "updated_at": "2022-03-31T17:06:18+04:00",
                    "taxable": true,
                    "barcode": "",
                    "grams": 0,
                    "image_id": null,
                    "weight": 0,
                    "weight_unit": "kg",
                    "inventory_item_id": 44914793316575,
                    "inventory_quantity": 0,
                    "old_inventory_quantity": 0,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/42820014473439"
*/
