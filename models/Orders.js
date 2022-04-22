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
    allowNull: false
  },
  product_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  indexes: [
    {
      unique: true,
      fields: ['source_id', 'product_id', 'email']
    }
  ]
},
{
  sequelize: db,
  modelName: 'orders',
  tableName: 'orders'
})

export default Orders

/*
            "id": 4748528746719,
            "admin_graphql_api_id": "gid://shopify/Order/4748528746719",
            "app_id": 1354745,
            "browser_ip": null,
            "buyer_accepts_marketing": true,
            "cancel_reason": null,
            "cancelled_at": null,
            "cart_token": null,
            "checkout_id": 33013834219743,
            "checkout_token": "b4794ed24704ca0f423ded1777e9409a",
            "closed_at": null,
            "confirmed": true,
            "contact_email": "helen1@gmail.com",
            "created_at": "2022-04-11T18:06:36+04:00",
            "currency": "AMD",
            "current_subtotal_price": "5700.00",
            "customer_locale": "en",
            "device_id": null,
            "discount_codes": [],
            "email": "helen1@gmail.com",
            "estimated_taxes": false,
            "financial_status": "paid",
            "fulfillment_status": null,
            "gateway": "manual",
            "landing_site": null,
            "landing_site_ref": null,
            "location_id": null,
            "name": "#1007",
            "note": null,
            "note_attributes": [],
            "number": 7,
            "order_number": 1007,
            "order_status_url": "https://amazing-firm.myshopify.com/63813091551/orders/4a892c97b4621681151854e34d90eb13/authenticate?key=8fd61e4f9e68c73e671b3b5fcab999ae",
            "original_total_duties_set": null,
            "payment_gateway_names": [
                "manual"
            ],
            "phone": "+16136120701",
            "presentment_currency": "AMD",
            "processed_at": "2022-04-11T18:06:36+04:00",
            "processing_method": "manual",
            "reference": null,
            "referring_site": null,
            "source_identifier": null,
            "source_name": "shopify_draft_order",
            "source_url": null,
            "subtotal_price": "5700.00",
            */
