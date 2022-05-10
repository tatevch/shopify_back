import Shopify from '@shopify/shopify-api'
import { Customer, Orders } from '../models'

import axios from 'axios'

const { accessToken } = process.env
const client = new Shopify.Clients.Rest('amazing-firm.myshopify.com', accessToken)

class OrdersController {
  static getOrders = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'orders'
      })
      const ordersList = data.body.orders.map((i) => i.name)

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
        closed_at: a.closed_at,
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

  static orderDelete = async (req, res, next) => {
    try {
      const orderId = 4772192714975
      await axios
        .delete(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/orders/${orderId}.json?access_token=${accessToken}`

        )
      res.json({
        status: 'ok'
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
        closed_at: req.body.closed_at,
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

  static ordersUpdateWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)

      const updateOrder = await Orders.findOne({
        where: { source_id: req.body.id }
      })
      console.log(2222 + req.body.closed_at)
      if (updateOrder) {
        updateOrder.update({
          source_id: req.body.id,
          email: req.body.email,
          name: req.body.name,
          order_number: req.body.order_number,
          customer_id: req.body.customer.id,
          closed_at: req.body.closed_at,
          product_id: req.body.line_items.map((p) => p.product_id),
          product_title: req.body.line_items.map((p) => p.title)
        })
      } else {
        console.log(7777)
        await Orders.create({
          source_id: req.body.id,
          email: req.body.email,
          name: req.body.name,
          order_number: req.body.order_number,
          customer_id: req.body.customer.id,
          closed_at: req.body.closed_at,
          product_id: req.body.line_items.map((p) => p.product_id),
          product_title: req.body.line_items.map((p) => p.title)
        })
      }
    } catch (e) {
      next(e)
    }
  }

  static OrdersCancalledWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)
      /* const deleteOrder = await Orders.findOne({
        where: { source_id: req.body.id }
      }) */
      // await deleteOrder.destroy()
    } catch (e) {
      next(e)
    }
  }

  static addOrdersToShopify = async (req, res, next) => {
    try {
      const { customerId } = req.body
      const data = await client.get({
        path: 'customers'
      })
      const customerList = data.body.customers
      const orderCustomer = customerList.find((i) => i.id === customerId)
      // console.log(orderCustomer)
      const { line_items } = req.body
      const orders = await axios
        .post(
           `https://amazing-firm.myshopify.com/admin/api/2022-04/orders.json?access_token=${accessToken}`,
           {

             order: { line_items, customer: orderCustomer }
           }
           // {"order":{"line_items":[{"variant_id":447654529,"quantity":1}]}}
        ).then((res) => res.data)
        .catch(e => e.response.data)
      res.json({
        status: 'ok',
        orders
      })
    } catch (e) {
      next(e)
    }
  }

  static updateOrdersToShopify = async (req, res, next) => {
    try {
      const { customerId, line_items } = req.body
      const data = await client.get({
        path: 'customers'
      })
      const customerList = data.body.customers
      const orderCustomer = customerList.find((i) => i.id === customerId)
      const orderId = 4773274419423

      // const orderingCustomer = await Customer.findOne({ where: { source_id: customerId } })

      const updateOrders = await axios
        .put(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/orders/${orderId}.json?access_token=${accessToken}`,
          {
            // {"order":{"id":450789469,"note":"Customer contacted us about a custom engraving on this iPod"}}
            order: {

              line_items
            }
          }

        ).then((res) => res.data)
        .catch(e => e.response.data)
      res.json({
        status: 'ok',
        updateOrders
      })
    } catch (e) {
      next(e)
    }
  }
}
export default OrdersController
