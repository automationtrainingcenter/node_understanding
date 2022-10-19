import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import Tour from './../models/tourModel.js';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

// get all the tours
export function getTours(req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
}

// create a new tour
export function createTour(req, res) {
  res.status(201).json({
    status: 'success',
    requestedAt: req.requestedAt,
    // data: {
    //   tour: newTour,
    // }
  });
}

// get tour by id
export function getTourByID(req, res) {
  let _id = req.params.id * 1;
  // let tour = tours.find((tr) => tr.id === _id);
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
}

// update tour by ID
export function updateTour(req, res) {
  let _id = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      tour: `Updated tour ... for ${_id}`,
    },
  });
}

// Delete tour by ID
export function deleteTour(req, res) {
  let _id = req.params.id;
  res.status(204).json({
    status: 'success',
    data: {
      tour: `Deleted tour ... for ${_id}`,
    },
  });
}
