import express from 'express';
import * as tourController from './../controllers/tourController.js';

let router = express.Router();

router.route('/').get(tourController.getTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourByID)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
