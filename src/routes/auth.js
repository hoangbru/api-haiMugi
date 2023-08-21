import express from 'express';
import { signup, signin, getAll, update, remove, get } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users',getAll);
router.route('/users/:id').get(get).patch(update).delete(remove);

export default router;