const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('./data/event.list.json');
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json())
app.use(cors())

//get all events
app.get('/api/events/', (req, res) => {
  res.json({ status: 'ok', events })
});

// Create a new event
app.post('/api/events', (req, res) => {
  if (req.body.title !== '' && req.body.date !== '') {
  const event = {
    id: events.length + 1,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
  };
    events.push(event);
    res.json(event);

  } else{
    res.status(400).send({
      message: "Something goes wrong!"
  });

  } 

});

// Update event
app.put('/events/:id', (req, res) => {
  const event = events.find((b) => b.id === parseInt(req.params.id));
  if (!event) res.status(404).send('event not found');
  event.title = req.body.title;
  event.event = req.body.description;
  event.event = req.body.date;
  event.event = req.body.category;
  res.json(event);
});

// Delete event
app.delete('/events/:id', (req, res) => {
  const event = events.find((b) => b.id === parseInt(req.params.id));
  if (!event) res.status(404).send('event not found');
  const index = events.indexOf(event);
  events.splice(index, 1);
  res.json(event);
});

app.use('*', (req, res) => res.sendStatus(404));

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});
