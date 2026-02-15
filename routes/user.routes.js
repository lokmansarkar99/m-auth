import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { updateSchema } from '../validators/auth.validator.js';

const router = express.Router();

// ALL PROTECTED
router.get('/', authenticate, getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, validate(updateSchema), updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
