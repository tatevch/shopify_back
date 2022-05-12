import express from 'express'
import ProductsController from '../controllers/ProductsController'
import VariansController from '../controllers/VariansController'
import CustomersController from '../controllers/CustomersController'
import OrdersController from '../controllers/OrdersController'
import validateShopify from '../middlewares/validation'
const router = express.Router()

router.get('/shopify-product-list', ProductsController.getShopifyData)
router.post('/add', ProductsController.addShopifyData)
router.get('/product-list', ProductsController.getProductList)
router.post('/variants', VariansController.getSopifyVariants)
router.get('/products-variants', VariansController.getProductWithVariants)
router.post('/webhook-create-product', validateShopify(), ProductsController.productCreatWebhook)
router.post('/webhook-update-product', validateShopify(), ProductsController.productUpdateWebhook)
router.post('/webhook-delete-product', validateShopify(), ProductsController.productDeleteWebhook)

router.post('/webhooks', ProductsController.addWebhooks)
router.get('/webhooks-list', ProductsController.getWebhooks)

router.get('/customer-list-shopify', CustomersController.getShopifyCustomers)
router.post('/add-customer', CustomersController.addCustomers)
router.get('/search-customer', CustomersController.searchCustomer)
router.post('/add-address', CustomersController.addAddress)
router.get('/customer-list', CustomersController.getCustomerList)
router.post('/webhook-create-customer', validateShopify(), CustomersController.customerstCreatWebhook)
router.post('/webhook-update-customer', validateShopify(), CustomersController.customerUpdateWebhook)
router.post('/webhook-delete-customer', validateShopify(), CustomersController.customersDeleteWebhook)
router.get('/orders-list-shopify', OrdersController.getOrders)
router.post('/add-orders', OrdersController.AddOrdersFromShopify)
router.post('/add-product-shopify', ProductsController.productAddToShopify)
router.post('/add-variant-shopify', ProductsController.addToShopifyVariants)
router.put('/update-variant-shopify', ProductsController.updateVariantFromShopify)
router.delete('/delete-variant-shopify', ProductsController.deleteVariantFromShopify)
router.get('/customer-address', CustomersController.getCusomerWithAddresses)
router.get('/customer-order-shopify', CustomersController.getCustomerOrdersFromShopify)
router.get('/customer-order', CustomersController.getCustomerOrders)
router.delete('/delete-product-shopify', ProductsController.deleteProductFromShopify)
router.put('/update-product-shopify', ProductsController.updateProductFromShopify)
router.get('/variant-list', VariansController.getVariantsProducts)
router.get('/variant-count', ProductsController.getVariantsCount)
router.post('/quantity', ProductsController.variantsInventoryQuantity)
router.post('/webhook-add-orders', validateShopify(), OrdersController.ordersAddWebhook)
router.post('/webhook-cancelled-orders', validateShopify(), OrdersController.OrdersCancalledWebhook)
router.post('/webhook-orders-update', validateShopify(), OrdersController.ordersUpdateWebhook)
router.post('/craeate-orders', OrdersController.addOrdersToShopify)
router.put('/update-orders', OrdersController.updateOrdersToShopify)
router.delete('/delete-orders', OrdersController.orderDelete)

export default router

