import products from './products'
const express = require('express')
const router = express.Router()
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Products' })
})
router.use('/products', products)
export default router
