import { DataTypes, Model } from 'sequelize'
import db from '../helpers/db'
import Address from './Address'

class Customer extends Model {

}
Customer.init({
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
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accepts_marketing: {
    type: DataTypes.STRING
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  orders_count: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  total_spent: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  last_order_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  verified_email: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  multipass_identifier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tax_exempt: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_order_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
  sequelize: db,
  modelName: 'customer',
  tableName: 'customer'
})

Address.belongsTo(Customer, {
  foreignKey: 'customer_id',
  targetKey: 'source_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'customer'
})

Customer.hasOne(Address, {
  foreignKey: 'customer_id',
  sourceKey: 'source_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'address'
})

export default Customer

// "id": 6146288746719,
//   "email": "bob.norman@gmail.com",
//   "accepts_marketing": false,
//   "created_at": "2022-04-07T14:45:39+04:00",
//   "updated_at": "2022-04-07T14:45:39+04:00",
//   "first_name": "John",
//   "last_name": "Norman",
//   "orders_count": 0,
//   "state": "disabled",
//   "total_spent": "0.00",
//   "last_order_id": null,
//   "note": "",
//   "verified_email": true,
//   "multipass_identifier": null,
//   "tax_exempt": false,
//   "phone": "+16135551111",
//   "tags": "",
//   "last_order_name": null,
//   "currency": "AMD",
