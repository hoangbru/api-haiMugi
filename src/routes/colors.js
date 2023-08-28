import { create, get, getAll, remove, update } from '../controllers/colors.js'
import express from 'express';

const router = express.Router();
router.route("/colors").get(getAll).post(create)
router.route("/color/:id").get(get).delete(remove).patch(update)

export default router;