// import the server and cross-origin packages, as well as the routes for the database functions
var express = require('express'),
  projects = require('./routes/projects'),
  cors = require('cors');

// create an express server
var app = express();

// configure settings for the server
app.configure(function (){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  // allows cross-origin for use on different ports, would be removed for production code
  app.use(cors());
});

// Map routes to database functionality
app.get('/', projects.findAll);
app.get('/projects', projects.findAll);
app.get('/projects/:id', projects.findById);
app.post('/projects', projects.addProject);
app.put('/projects/:id', projects.updateProject);
app.delete('/projects/:id');

// tell the server to be listen for requests locally on port 3000
app.listen(3000);
console.log("Listening on port 3000...");
