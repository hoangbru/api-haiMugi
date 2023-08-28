import { create, get, getAll, remove, update } from '../controllers/sizes.js'
import express from 'express';

const router = express.Router();
router.route("/sizes").get(getAll).post(create)
router.route("/size/:id").get(get).delete(remove).patch(update)

export default router;