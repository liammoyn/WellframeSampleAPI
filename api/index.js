var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./routes')

// Set up the express app
const app = express();

//For JSON input
app.use(bodyParser.json());
//For form input
app.use(bodyParser.urlencoded({extended: false}));

//Register all routes
app.use('/api/v1/', routes);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});