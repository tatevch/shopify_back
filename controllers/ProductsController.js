import Shopify, { DataType } from '@shopify/shopify-api'
import { Products, Variants } from '../models'

import axios from 'axios'

import Promise from 'bluebird'

const { accessToken } = process.env
const client = new Shopify.Clients.Rest('amazing-firm.myshopify.com', accessToken)

class ProductsController {
  static getShopifyData = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'products'
      })

      const productList = data.body.products

      res.json({
        status: 'ok',
        productList
      })
    } catch (e) {
      next(e)
    }
  }

  static addShopifyData = async (req, res, next) => {
    try {
      // 'your-development-store.myshopify.com'
      const data = await client.get({
        path: 'products'
      })
      const addProducts = await Products.bulkCreate(data.body.products.map(p => ({

        source_id: p.id,
        title: p.title,
        body_html: p.body_html,
        vendor: p.vendor,
        product_type: p.product_type,
        handle: p.handle,
        status: p.status,
        admin_graphql_api_id: p.admin_graphql_api_id
      })))

      res.json({
        status: 'ok',
        addProducts
      })
    } catch (e) {
      next(e)
    }
  }

  // https://728e-178-160-242-242.ngrok.io
  static addWebhooks = async (req, res, next) => {
    try {
      // const data = await client.post({
      //   path: 'webhooks',
      //   data: {
      //     "webhook": {
      //       "topic": "products\/create",
      //       "address": "https:\/\/38a0-178-160-242-242.ngrok.io\/products\/product-create-webhook",
      //       "format": "json",
      //       "fields": ["id", "note"]
      //     }
      //   },
      //   type: DataType.JSON,
      // });
      // const data = await client.post({
      //   path: 'webhooks',
      //   data: {
      //     "webhook": {
      //       "topic": "products\/update",
      //       "address": "https:\/\/38a0-178-160-242-242.ngrok.io\/products\/product-update-webhook",
      //       "format": "json",
      //       "fields": ["id", "note"]
      //     }
      //   },
      //   type: DataType.JSON,
      // });
      // customers/create
      const data = await client.post({
        path: 'webhooks',
        data: {
          webhook: {
            topic: 'orders\/edited',
            address: 'https:\/\/728e-178-160-242-242.ngrok.io\/products\/webhook-edit-orders',
            format: 'json'
          }
        },
        type: DataType.JSON
      })
      res.json({
        status: 'ok',
        // addProducts,
        data
      })
    } catch (e) {
      next(e)
    }
  }

  static getWebhooks = async (req, res, next) => {
    try {
      const data = await client.get({
        path: 'webhooks'
      })
      res.json({
        status: 'ok',
        data
      })
    } catch (e) {
      next(e)
    }
  }

  static getProductList = async (req, res, next) => {
    try {
      const perPage = 2
      const { page } = req.body

      const productList = await Products.findAll({
        where: {},
        offset: (perPage * page),
        limit: perPage
      })
      res.json({
        status: 'ok',
        productList,
        page
      })
    } catch (e) {
      next(e)
    }
  }

  static productCreatWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)

      const product = await Products.create({ source_id: req.body.id })
      const data = await client.get({
        path: 'products'
      })
      const productList = data.body.products

      const myProduct = productList.find(i => i.id === req.body.id)

      product.title = myProduct.title
      product.body_html = myProduct.body_html
      product.vendor = myProduct.vendor
      product.product_type = myProduct.product_type
      product.handle = myProduct.handle
      product.status = myProduct.status
      product.admin_graphql_api_id = myProduct.admin_graphql_api_id
      await product.save()

      const datav = await client.get({
        path: `products/${req.body.id}/variants`
      })

      const variant = await Variants.bulkCreate(datav.body.variants.map(v => ({
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
        quantity: v.inventory_quantity
      })))
      res.json({
        status: 'ok',
        product,
        variant
      })
    } catch (e) {

    }
  }

  static productUpdateWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)

      const updateProduct = await Products.findOne({
        where: { source_id: req.body.id }
      })

      const data = await client.get({
        path: 'products'
      })

      const productUpdateShopify = data.body.products.find(i => i.id === req.body.id)

      updateProduct.title = productUpdateShopify.title
      updateProduct.body_html = productUpdateShopify.body_html
      updateProduct.vendor = productUpdateShopify.vendor
      updateProduct.product_type = productUpdateShopify.product_type
      updateProduct.handle = productUpdateShopify.handle
      updateProduct.status = productUpdateShopify.status
      updateProduct.admin_graphql_api_id = productUpdateShopify.admin_graphql_api_id

      await updateProduct.save()

      const variants = productUpdateShopify.variants
      const vatiantId = productUpdateShopify.variants.map((i) => i.id)
      console.log(vatiantId)

      const excistVariant = await Variants.findAll({ where: { product_id: req.body.id } })

      await Promise.map(variants, async (variant) => {
        const exists = excistVariant.find(a => a.source_id === variant.id)

        if (exists) {
          console.log(55555)
          await exists.update({
            title: variant.title,
            price: variant.price,
            sku: variant.sku,
            position: variant.position,
            option1: variant.option1,
            option2: variant.option2,
            option3: variant.option3,
            inventory_item_id: variant.inventory_item_id,
            quantity: variant.inventory_quantity
          })
        } else {
          console.log(333)
          await Variants.create({
            source_id: variant.id,
            product_id: variant.product_id,
            title: variant.title,
            price: variant.price,
            sku: variant.sku,
            position: variant.position,
            option1: variant.option1,
            option2: variant.option2,
            option3: variant.option3,
            inventory_item_id: variant.inventory_item_id,
            quantity: variant.inventory_quantity
          })
        }
      })

      const productId = variants[0].product_id

      const variantSourceId = variants.map((v) => v.id)

      const deleteVariant = await Variants.findAll({
        where: {
          product_id: productId,
          source_id: { $notIn: variantSourceId }
        }
      })

      await Variants.destroy({
        where: {
          product_id: productId,
          id: { $in: deleteVariant.map((v) => v.id) }
        }
      })

      res.json({
        status: 'ok'
        // updateProduct,
      })
    } catch (e) {
      next(e)
    }
  }

  static productDeleteWebhook = async (req, res, next) => {
    try {
      console.log(req.body, req.query, req.headers)
      const deleteProduct = await Products.findOne({
        where: { source_id: req.body.id }
      })
      await deleteProduct.destroy()
      const deleteVariants = await Variants.findAll({
        where: { product_id: req.body.id }
      })
      await deleteVariants.map((p) => p.destroy())

      res.json({
        status: 'ok'
        // deleteProduct
      })
    } catch (e) {
      next(e)
    }
  }

  static productAddToShopify = async (req, res, next) => {
    const {
      title, body_html, price, sku, barcode, vendor, product_type, status, options, variants
    } = req.body

    try {
      const p = await axios
        .post(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/products.json?access_token=${accessToken}`,
          {
            product: {
              title, body_html, price, sku, barcode, vendor, product_type, status, options, variants
            }
          }
        ).then((res) => res.data)
        .catch(e => e.response.data)

      res.json({
        status: 'ok',
        p
      })
    } catch (e) {
      next(e)
    }
  }

  static addToShopifyVariants = async (req, res, next) => {
    try {
      const { productId } = req.query //= 7688425603295
      const {
        title,
        price,
        sku,
        position,
        option1,
        option2,
        option3
      } = req.body
      const newvariant = await axios
        .post(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/products/${productId}/variants.json?access_token=${accessToken}`,
          {
            variant: {
              title,
              price,
              sku,
              position,
              option1,
              option2,
              option3
            }
          }
        ).then((res) => res.data)
        .catch(e => {
          return e.response.data
        })
      res.json({
        status: 'ok',
        newvariant
      })
    } catch (e) {
      next(e)
    }
  }

  static updateVariantFromShopify = async (req, res, next) => {
    try {
      const { variantId } = req.query //= 42929820336351
      const {
        title,
        price,
        sku,
        position,
        option1,
        option2,
        option3

      } = req.body
      const updateVariant = await axios
        .put(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/variants/${variantId}.json?access_token=${accessToken}`,
          {
            variant: {
              title,
              price,
              sku,
              position,
              option1,
              option2,
              option3
            }
          }
        ).then((res) => res.data)
        .catch(e => {
          return e.response.data
        })

      res.json({
        status: 'ok',
        updateVariant
      })
    } catch (e) {
      next(e)
    }
  }

  static deleteVariantFromShopify = async (req, res, next) => {
    try {
      const { variantId } = req.query //= 42929470570719
      const { productId } = req.query //= 7685228953823
      await axios
        .delete(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/products/${productId}/variants/${variantId}.json?access_token=${accessToken}`
        )
      res.json({
        status: 'ok'
      })
    } catch (e) {
      next(e)
    }
  }

  static deleteProductFromShopify = async (req, res, next) => {
    try {
      // const productId = 7682801369311
      const { productId } = req.query
      await axios
        .delete(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/products/${productId}.json?access_token=${accessToken}`
        )
      res.json({
        status: 'ok'
      })
    } catch (e) {
      next(e)
    }
  }

  static updateProductFromShopify = async (req, res, next) => {
    const {
      title, body_html, price, sku, barcode, vendor, product_type, status, options, variants
    } = req.body
    try {
      const { productId } = req.query //= 7680392167647

      const p = await axios
        .put(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/products/${productId}.json?access_token=${accessToken}`,
          {
            product: {
              title, body_html, price, sku, barcode, vendor, product_type, status, options, variants
            }
          }
        ).then((res) => res.data)
        .catch(e => {
          return e.response.data
        })
      res.json({
        status: 'ok',
        p
      })
    } catch (e) {
      next(e)
    }
  }

  static getVariantsCount = async (req, res, next) => {
    try {
      const productId = 7665229562079
      const count = await axios
        .get(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/products/${productId}/variants/count.json?access_token=${accessToken}`

        ).then((res) => res.data)
      res.json({
        status: 'ok',
        count
      })
    } catch (e) {
      next(e)
    }
  }

  static variantsInventoryQuantity = async (req, res, next) => {
    try {
      const {
        inventory_item_id,
        location_id,
        available
        // admin_graphql_api_id
      } = req.body
      const quanitiys = await axios
        .post(
          `https://amazing-firm.myshopify.com/admin/api/2022-04/inventory_levels/set.json?access_token=${accessToken}`,
          {
            // inventory_level: {
            inventory_item_id,
            location_id,
            available
            // admin_graphql_api_id
          }
          // }

        ).then((res) => res.data)
        .catch(e => {
          return e.response.data
        })
      res.json({
        status: 'ok',
        quanitiys
      })
    } catch (e) {
      next(e)
    }
  }
}

export default ProductsController
