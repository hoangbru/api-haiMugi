import express from "express"
import { create, forceDelete, getAll, getById, getBySlug, getProducts, getTrash, remove, restore, update } from "../controllers/products.js"
const router = express.Router()

router.get('/products/all', getAll)
router.get('/products', getProducts)
router.get('/products/trash', getTrash)
router.get('/product/:id', getById)
router.get('/product/:slug', getBySlug)
router.post('/product', create)
router.delete('/product/:id/remove', remove)
router.delete('/product/:id/delete', forceDelete)
router.patch('/product/:id/update', update)
router.patch('/product/:id/restore', restore)

export default router