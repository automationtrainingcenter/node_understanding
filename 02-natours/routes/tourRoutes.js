import express from 'express';
import * as tourController from './../controllers/tourController.js';

let router = express.Router();

router.param('id', tourController.checkID);

// checking the body before creating the tour
// chaining multiple middlewares
router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourByID)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
