const express = require('express');
<<<<<<< HEAD
const path = require('path')
const app = express();
const root = path.join(__dirname);
const PORT = process.env.PORT || 3500;


// !important 
app.use(express.static('public'));



// built in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }))

// built in middleware for json
app.use(express.json());

//! routes
app.get('/', (req, res) => {
  res.sendFile(path.join('public', 'views', 'menu.html'), { root: root })
});
app.get('/game(.html)?', (req, res) => {
  res.sendFile(path.join('public', 'views', 'game.html'), { root: root })

})

app.get('/test', (req, res) => {
  res.sendFile(path.join('public', 'views', 'index.html'), { root: root })
});
app.get('/rules', (req, res) => {
  res.sendFile(path.join('public', 'views', 'rules.html'), { root: root })
});

app.listen(PORT, () => {
  console.log('server is listing on Port: ', PORT);
=======

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
>>>>>>> 8cc3848 (remote replit)
});
