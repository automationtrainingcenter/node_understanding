import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
// create an app
let app = express();

// add a middleware to read the data from the requests
app.use(express.json());

let port = 3000;
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// get all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// create a new tours
app.post('/api/v1/tours', (req, res) => {
  let newID = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// get tour details by ID
app.get('/api/v1/tours/:id', (req, res) => {
  let _id = req.params.id * 1;
  let tour = tours.find((tr) => tr.id === _id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// patch requests
app.patch('/api/v1/tours/:id', (req, res) => {
  let _id = req.params.id;
  if (isNaN(_id) || _id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: `Updated tour ... for ${_id}`,
    },
  });
});

// delete requests
app.delete('/api/v1/tours/:id', (req, res) => {
  let _id = req.params.id;
  if (isNaN(_id) || _id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tour: `Deleted tour ... for ${_id}`,
    },
  });
});

app.listen(port, () => {
  console.log('App is running on port ', port);
});
