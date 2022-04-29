import Shopify from '@shopify/shopify-api'
import { Variants } from '../models'
import Products from '../models/Products'

const { accessToken } = process.env

class VariansController {
  static getSopifyVariants = async (req, res, next) => {
    try {
      const client = new Shopify.Clients.Rest('amazing-firm.myshopify.com', accessToken)
      const { productId } = req.query
      const data = await client.get({
        path: `products/${productId}/variants`
      })

      // const variant=data.body.variants
      const addVariant = await Variants.bulkCreate(data.body.variants.map(v => ({
        source_id: v.id,
        product_id: v.product_id,
        title: v.title,
        price: v.price,
        sku: v.sku,
        position: v.position,
        option1: v.option1,
        option2: v.option2,
        option3: v.option3,
        inventory_item_id: v.inventory_item_id,
        inventory_quantity: v.inventory_quantity
      })))
      res.json({
        status: 'ok',
        addVariant
        // variant
      })
    } catch (e) {
      next()
    }
  }

  static getProductWithVariants = async (req, res, next) => {
    try {
      const perPage = 4
      const { page } = req.query

      const product = await Products.findAll({
        where: {},
        include: [{
          model: Variants,
          as: 'variants'
        }],
        offset: (perPage * +page),
        limit: perPage
      })

      res.json({
        status: 'ok',
        product,
        page
      })
    } catch (e) {
      console.log(e)
      next(e)
    }
  }

  static getVariantsProducts = async (req, res, next) => {
    try {
      const variants = await Variants.findAll({
        where: {},
        include: [{
          model: Products,
          as: 'products',
          where: {}
        }]
      })
      // variants.map((v) => v.product_id)
      res.json({
        status: 'ok',
        variants
      })
    } catch (e) {
      next(e)
    }
  }
}

export default VariansController
/*
id: 42864956440799,
      product_id: 7666437325023,
      title: '50 / grey / wool',
      price: '47000.00',
      sku: 'S-20',
      position: 1,
      inventory_policy: 'deny',
      compare_at_price: null,
      fulfillment_service: 'manual',
      inventory_management: 'shopify',
      option1: '50',
      option2: 'grey',
      option3: 'wool',
      inventory_item_id: 44959745310943,
      inventory_quantity: 1,
      old_inventory_quantity: 1,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/42864956440799' */
