import { DataTypes, Model } from 'sequelize'
import db from '../helpers/db'
class Address extends Model {

}
Address.init({
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
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  province: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  zip: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  province_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country_name: {
    type: DataTypes.STRING,
    allowNull: true
  }

},
{
  sequelize: db,
  modelName: 'address',
  tableName: 'address'
})

export default Address
/* "id": 207119551,
  "customer_id": 207119551,
  "first_name": null,
  "last_name": null,
  "company": null,
  "address1": "Chestnut Street 92",
  "address2": "",
  "city": "Louisville",
  "province": "Kentucky",
  "country": "United States",
  "zip": "40202",
  "phone": "555-625-1199",
  "name": "",
  "province_code": "KY",
  "country_code": "US",
  "country_name": "United States",
  "default": true */
