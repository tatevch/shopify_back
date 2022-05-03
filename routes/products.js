import express from 'express'
import ProductsController from '../controllers/ProductsController'
import VariansController from '../controllers/VariansController'
import CustomersController from '../controllers/CustomersController'
import OrdersController from '../controllers/OrdersController'

const router = express.Router()

router.get('/shopify-product-list', ProductsController.getShopifyData)
router.post('/add', ProductsController.addShopifyData)
router.get('/product-list', ProductsController.getProductList)
router.post('/variants', VariansController.getSopifyVariants)
router.get('/products-variants', VariansController.getProductWithVariants)
router.post('/webhook-create-product', ProductsController.productCreatWebhook)
router.post('/webhook-update-product', ProductsController.productUpdateWebhook)
router.post('/webhook-delete-product', ProductsController.productDeleteWebhook)
// router.post('/new-customers-create-webhook',CustomersController.customerstCreatWebhook);

router.post('/webhooks', ProductsController.addWebhooks)
router.get('/webhooks-list', ProductsController.getWebhooks)
// router.post('/orders-create-webhook',OrdersController.ordersCreateWebhook);
router.get('/customer-list-shopify', CustomersController.getShopifyCustomers)
router.post('/add-customer', CustomersController.addCustomers)
router.post('/add-address', CustomersController.addAddress)
router.get('/customer-list', CustomersController.getCustomerList)
router.post('/webhook-create-customer', CustomersController.customerstCreatWebhook)
router.post('/webhook-update-customer', CustomersController.customerUpdateWebhook)
router.post('/webhook-delete-customer', CustomersController.customersDeleteWebhook)
router.get('/orders-list-shopify', OrdersController.getOrders)
router.post('/add-orders', OrdersController.AddOrdersFromShopify)
router.post('/add-product-shopify', ProductsController.productAddToShopify)
router.post('/add-variant-shopify', ProductsController.addToShopifyVariants)
router.put('/update-variant-shopify', ProductsController.updateVariantFromShopify)
router.delete('/delete-variant-shopify', ProductsController.deleteVariantFromShopify)
router.get('/customer-address', CustomersController.getCusomerWithAddresses)
router.delete('/delete-product-shopify', ProductsController.deleteProductFromShopify)
router.put('/update-product-shopify', ProductsController.updateProductFromShopify)
router.get('/variant-list', VariansController.getVariantsProducts)
router.get('/variant-count', ProductsController.getVariantsCount)
router.post('/quantity', ProductsController.variantsInventoryQuantity)
router.post('/webhook-create-orders', OrdersController.ordersAddWebhook)
router.post('/craeate-orders', OrdersController.addOrdersToShopify)
// router.post('/webhook-cancelled-orders', OrdersController.OrdersCancalledWebhook)
export default router
// products-variants?page=4 req.query
