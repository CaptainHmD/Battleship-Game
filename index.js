const express = require('express');
const path = require('path')
const app = express();
const root = path.join(__dirname);
const PORT = process.env.PORT ||3500;


// !important 
app.use(express.static('public'));



// built in middleware to handle urlencoded from data
app.use(express.urlencoded({extended:true}))

// built in middleware for json
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.get('/test', (req, res) => {
   res.sendFile(path.join('public','views','index.html'),{root:root})
});
app.get('/rules', (req, res) => {
   res.sendFile(path.join('public','views','rules.html'),{root:root})
});

app.listen(PORT, () => {
  console.log('server is listing on Port: ',PORT);
});
