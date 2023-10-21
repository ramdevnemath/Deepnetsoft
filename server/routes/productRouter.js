import express from 'express'
import multer from "multer";
import * as productController from '../controllers/productController.js'

const upload = multer({ dest: '../public/images' })

const productRouter = express.Router()

productRouter.post('/category/create', productController.addCategory)
productRouter.get('/categories/get', productController.getCategories)
productRouter.post('/add', upload.single('image'), productController.addProduct)
productRouter.get('/get', productController.getProducts)
productRouter.get('/sub-categories/get/:id', productController.getSubCategories)

export default productRouter