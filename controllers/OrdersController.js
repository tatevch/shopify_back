import Shopify from '@shopify/shopify-api'
import { Orders } from '../models'

import axios from 'axios'

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
      const orders = await Orders.bulkCreate(ordersList.map(a => ({
        source_id: a.id,
        email: a.email,
        name: a.name,
        order_number: a.order_number,
        customer_id: a.customer.id,
        product_id: a.line_items.map((p) => p.product_id),
        product_title: a.line_items.map((p) => p.title)
      })))
      res.json({
        status: 'ok',
        orders
      })
    } catch (e) {
      next(e)
    }
  }

  static orderCancel = async (req, res, next) => {
    try {
      const orderId = req.query
      await axios
        .post(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/orders/${orderId}}/cancel.json?access_token=${accessToken}`

        ).then((res) => res.data)
        .catch(e => {
          return e.response.data
        })
    } catch (e) {
      next(e)
    }
  }

  static ordersAddWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)
      const order = await Orders.create({
        source_id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        order_number: req.body.order_number,
        customer_id: req.body.customer.id,
        product_id: req.body.line_items.map((p) => p.product_id),
        product_title: req.body.line_items.map((p) => p.title)
      })
      console.log(req.body.line_items.map((p) => p.product_id))
      res.json({
        status: 'ok',
        order
      })
    } catch (e) {
      next(e)
    }
  }

  static OrdersCancalledWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)
      const deleteOrder = await Orders.findOne({
        where: { source_id: req.body.id }
      })
      // await deleteOrder.destroy()
    } catch (e) {
      next(e)
    }
  }

  static addOrdersToShopify = async (req, res, next) => {
    try {
      const { variant_id, quantity } = req.body
      await axios
        .post(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/orders.json?access_token=${accessToken}`,
          {
            order: { line_items: [{ variant_id }, { quantity }] }
          }
          // {"order":{"line_items":[{"variant_id":447654529,"quantity":1}]}}

        ).then((res) => res.data)
        .catch(e => e.response.data)
    } catch (e) {
      next(e)
    }
  }
}
export default OrdersController
