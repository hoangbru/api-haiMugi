import { create, get, getAll, remove, update } from '../controllers/categories.js'
import express from 'express';

const router = express.Router();
router.route("/categories").get(getAll).post(create)
router.route("/category/:id").get(get).delete(remove).patch(update)

export default router;