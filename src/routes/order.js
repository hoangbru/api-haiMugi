import { create, get, getAll, getByIdUser, remove, restore, update } from '../controllers/order.js'
import express from 'express';

const router = express.Router();
router.get("/order/user/:idUser",getByIdUser)
router.patch("/order/:id/restore",restore)
router.route("/order").get(getAll).post(create)
router.route("/order/:id").get(get).patch(update).delete(remove)

export default router;