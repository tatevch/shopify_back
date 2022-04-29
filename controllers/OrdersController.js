import Shopify from '@shopify/shopify-api'
import { Orders } from '../models'
import Promise from 'bluebird'

const { accessToken } = process.env
const client = new Shopify.Clients.Rest('amazing-firm.myshopify.com', accessToken)

class OrdersController {
  static getOrders = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'orders'
      })
      const ordersList = data.body.orders
      // const CustomerId = ordersList.map((i) => i.customer.id)
      // const lineItems = ordersList.map((i) => i.line_items.map((j) => j.name))
      // console.log(lineItems)
      res.json({
        status: 'ok',
        ordersList
      })
    } catch (e) {
      next(e)
    }
  }

  static AddOrdersFromShopify = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'orders'
      })
      const ordersList = data.body.orders
      const customers = ordersList.map((c) => c.customer)
      // const cId = customers.map((k) => k.id)
      // console.log(cId.map((i) => i))
      const orders = await Orders.bulkCreate(ordersList.map(a => ({
        source_id: a.id,
        email: a.email,
        name: a.name,
        order_number: a.order_number
      })))

      await Promise.map(customers, async (customer) => {
        const exsistOrder = orders.find(i => i.email === customer.email)
        if (exsistOrder) {
          await exsistOrder.update({
            customer_id: customer.id
          })
        }
      })
      res.json({
        status: 'ok',
        orders
      })
    } catch (e) {
      next(e)
    }
  }
}
export default OrdersController
