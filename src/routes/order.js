import { create, getAll, get, getByUserId, update } from '../controllers/order.js'
import express from 'express';

const router = express.Router();
router.route("/orders").get(getAll).post(create)
router.route("/order/:id").get(get).patch(update)
router.get("/order/user/:userId", getByUserId)

export default router;