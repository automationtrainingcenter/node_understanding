import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// param middleware function will takes 4th argument value
export function checkID(req, res, next, value) {
  value = value * 1;
  if (isNaN(value) || value > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
}

export function checkBody(req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing either name or price in body',
    });
  }
}

// get all the tours
export function getTours(req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    results: tours.length,
    data: {
      tours,
    },
  });
}

// create a new tour
export function createTour(req, res) {
  let newID = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        requestedAt: req.requestedAt,
        data: {
          tour: newTour,
        },
      });
    }
  );
}

// get tour by id
export function getTourByID(req, res) {
  let _id = req.params.id * 1;
  let tour = tours.find((tr) => tr.id === _id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
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
