import Shopify from '@shopify/shopify-api'
import Promise from 'bluebird'
import Customer from '../models/Customer'
import Address from '../models/Address'

const { accessToken } = process.env
const client = new Shopify.Clients.Rest('amazing-firm.myshopify.com', accessToken)

class CustomersController {
  static getShopifyCustomers = async (req, res, next) => {
    try {
      // 'your-development-store.myshopify.com'
      const data = await client.get({
        path: 'customers'
      })
      // console.log(data.body);
      const customerList = data.body.customers
      // const myProduct = productList.find(i => i.id === 7666235343071);
      res.json({
        status: 'ok',
        customerList
      })
    } catch (e) {
      next(e)
    }
  }

  static addCustomers = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'customers'
      })
      console.log(data.body)
      const addCustomer = await Customer.bulkCreate(data.body.customers.map(c => ({
        source_id: c.id,
        email: c.email,
        accepts_marketing: c.accepts_marketing,
        first_name: c.first_name,
        last_name: c.last_name,
        orders_count: c.orders_count,
        state: c.state,
        total_spent: c.total_spent,
        last_order_id: c.last_order_id,
        verified_email: c.verified_email,
        multipass_identifier: c.multipass_identifier,
        tax_exempt: c.tax_exempt,
        phone: c.phone,
        last_order_name: c.last_order_name,
        currency: c.currency
      })))

      // const customerAddress= data.body.customers.map((c)=>c.addresses);
      // console.log(customerAddress[0].map((i)=>i.id))

      // const aa= customerAddress.map((a=>a.map(i=>i.id)));

      res.json({
        status: 'ok',
        addCustomer
        // addAddress
        // customerAddress
      })
    } catch (e) {
      next(e)
    }
  }

  static addAddress = async (req, res, next) => {
    try {
      // const customerId = 6146462449887
      const { customerId } = req.body
      const data = await client.get({
        path: `customers/${customerId}/addresses`
      })

      const customerAddress = data.body.addresses
      console.log(customerAddress)
      const addAddress = await Address.bulkCreate(customerAddress.map(a => ({
        source_id: a.id,
        customer_id: a.customer_id,
        first_name: a.first_name,
        last_name: a.last_name,
        company: a.company,
        address1: a.address1,
        address2: a.address2,
        city: a.city,
        zip: a.zip,
        province: a.province,
        country: a.country,
        phone: a.phone,
        name: a.name,
        province_code: a.province_code,
        country_code: a.country_code,
        country_name: a.country_name
      })))
      res.json({
        status: 'ok',
        addAddress
      })
    } catch (e) {
      next(e)
    }
  }

  static getCustomerList = async (req, res, next) => {
    try {
      const customerList = await Customer.findAll({
        where: {},
        include: [{
          model: Address,
          as: 'address',
          required: true,
          where: {}
        }]
      })
      res.json({
        status: 'ok',
        customerList
      })
    } catch (e) {
      next(e)
    }
  }

  static customerstCreatWebhook = async (req, res, next) => {
    try {
      // console.log(req.body, req.query, req.headers);
      const data = await client.get({
        path: 'customers'
      })
      const address = req.body.addresses[0]
      console.log(req.body.id, req.body.email, address)

      const customer = await Customer.create({
        source_id: req.body.id,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        orders_count: req.body.orders_count,
        state: req.body.state,
        total_spent: req.body.total_spent,
        last_order_id: req.body.last_order_id,
        verified_email: req.body.verified_email,
        multipass_identifier: req.body.multipass_identifier,
        tax_exempt: req.body.tax_exempt,
        phone: req.body.phone,
        last_order_name: req.body.last_order_name,
        currency: req.body.currency
      })

      const newAddress = await Address.create({
        source_id: address.id,
        customer_id: address.customer_id,
        first_name: address.first_name,
        last_name: address.last_name,
        company: address.company,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        zip: address.zip,
        province: address.province,
        country: address.country,
        phone: address.phone,
        name: address.name,
        province_code: address.province_code,
        country_code: address.country_code,
        country_name: address.country_name
      })

      res.json({
        status: 'ok',
        customer,
        newAddress
      })
    } catch (e) {
      next(e)
    }
  }

  static customerUpdateWebhook = async (req, res, next) => {
    try {
      const updateCustomer = await Customer.findOne({
        where: { source_id: req.body.id }
      })
      const data = await client.get({
        path: 'customers'
      })

      console.log(4)
      const customerShopify = data.body.customers.find(i => i.id === req.body.id)
      console.log(5)
      const addresses = customerShopify.addresses.filter((i) => i.customer_id === req.body.id)
      const excistAddress = await Address.findAll({
        where: {
          source_id: addresses.map(a => a.id)
        }
      })

      await Promise.map(addresses, async (address) => {
        const exists = excistAddress.find(a => a.source_id === address.id)
        if (exists) {
          await exists.update({
            customer_id: address.customer_id,
            first_name: address.first_name,
            last_name: address.last_name,
            company: address.company,
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            zip: address.zip,
            province: address.province,
            country: address.country,
            phone: address.phone,
            name: address.name,
            province_code: address.province_code,
            country_code: address.country_code,
            country_name: address.country_name
          })
          // console.log(exists);
          console.log(12)
        } else {
          await Address.create({
            source_id: address.id,
            customer_id: address.customer_id,
            first_name: address.first_name,
            last_name: address.last_name,
            company: address.company,
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            zip: address.zip,
            province: address.province,
            country: address.country,
            phone: address.phone,
            name: address.name,
            province_code: address.province_code,
            country_code: address.country_code,
            country_name: address.country_name
          })
          console.log(222)
        }
      })
      const customerId = customerShopify.addresses[0].customer_id
      const addressSource_Id = addresses.map((a) => a.id)
      const deleteAddress = await Address.findAll({
        where: {
          customer_id: customerId,
          source_id: { $notIn: addressSource_Id }
        }
      })

      deleteAddress.map((d) => d.destroy())
      console.log(deleteAddress)
      res.json({
        status: 'ok'
      })
    } catch (e) {
      console.log(e)
      next(e)
    }
  }

  static customersDeleteWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)

      const deleteCustomer = await Customer.findOne({
        where: {
          source_id: req.body.id
        }
      })
      await deleteCustomer.destroy()
      const deleteAddress = await Address.findOne({
        where: {
          customer_id: req.body.id
        }
      })
      await deleteAddress.destroy()
      res.json({
        status: 'ok'
      })
    } catch (e) {
      next(e)
    }
  }

  static getCusomerWithAddresses = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'customers'
      })
      const customerShopify = data.body.customers.find(i => i.id === 6146288746719)
      const address = customerShopify.addresses.filter((i) => i.customer_id === 6146288746719)// 6152610644191);

      address.map((item) => {
        console.log(item.id, item.first_name, item.customer_id)
      })
      const excistAddress = await Address.findAll({
        where: {
          source_id: address.map(a => a.id)
        }
      })

      res.json({
        status: 'ok',
        // customerShopify,
        // address,
        excistAddress
      })
    } catch (e) {
      next(e)
    }
  }
}

export default CustomersController
/* id: 6147619979487,
  email: 'masha@gmai.com',
  accepts_marketing: false,?
  created_at: '2022-04-08T15:18:43+04:00',
  updated_at: '2022-04-08T15:18:43+04:00',
  first_name: 'Masha',
  last_name: 'Beiker',
  orders_count: 0,
  state: 'disabled',
  total_spent: '0.00',
  last_order_id: null,
  note: '',
  verified_email: true,
  multipass_identifier: null,
  tax_exempt: false,
  phone: '+16134470703',
  tags: '',
  last_order_name: null,
  currency: 'AMD', */
