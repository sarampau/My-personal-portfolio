const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const FormData = require('form-data');


const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'));

// Here we are setting the directory to be ./views
// thereby letting the app know where to find the template files.
app.set('views', './views');

// Here we are setting the default engine to be ejs
// note we don't need to require it, express will do that for us.
app.set('view engine', 'ejs');

// Now instead of using res.send we can use
// res.render to send the output of the template by filename
app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Manny',
      lastName: 'Carbajal',
    }
  }
  res.render('index', data);
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', {  contact: req.body })
  const url = 'https://script.google.com/macros/s/AKfycbxPCXi09oN6KWZx58P3GlM-XILSFHTVXDRbsB_YEV-yczwkbsQ/exec'  
  const data = new FormData();
  const fields = Object.keys(req.body);
  fields.forEach(field => {
      data.append(field, req.body[field])
  })
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  data.submit(url, function(err, res) {  
  });
  res.render('thanks', { contact: req.body });
});

app.listen(8080, () => {
  console.log('listening at http://localhost:8080');
});