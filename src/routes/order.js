import { create, getAll, get } from '../controllers/order.js'
import express from 'express';

const router = express.Router();
router.route("/orders").get(getAll).post(create)
router.get("/order/:id", get)

export default router;