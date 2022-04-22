import Shopify from '@shopify/shopify-api'
const { accessToken } = process.env
const client = new Shopify.Clients.Rest('amazing-firm.myshopify.com', accessToken)

class OrdersController {
  static getOrders = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'orders'
      })
      const ordersList = data.body.orders
      console.log(ordersList)
      res.json({
        status: 'ok',
        ordersList
      })
    } catch (e) {
      next(e)
    }
  }

  static ordersCreateWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)
    } catch (e) {

    }
  }
}
export default OrdersController
