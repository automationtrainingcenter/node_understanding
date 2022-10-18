import express from 'express';
import * as userController from './../controllers/userController.js';

let router = express.Router();

router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserByID)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
