import { create, getAll } from '../controllers/order.js'
import express from 'express';

const router = express.Router();
router.route("/orders").get(getAll).post(create)

export default router;