const { SlowBuffer } = require('buffer');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({ message: 'Hello from the server side', name: 'natours' });
// });

// app.get('/shashank', (req, res) => {
//   res.json({ message: 'Hello from the server side', name: 'shashank' });
// });

// app.post('/new', (req, res) => {
//   res.json({ message: 'Hello from the server side', name: 'shashank' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const i = req.params * 1;
  const tour = tours.find((el) => el.id === i);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

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
  // res.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
