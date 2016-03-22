var express = require('express'),
  projects = require('./routes/projects');

var app = express();

app.configure(function (){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

app.get('/projects', projects.findAll);
app.get('/projects/:id', projects.findById);
app.post('/projects', projects.addProject);
app.put('/projects/:id', projects.updateProject);
app.delete('/projects/:id');

app.listen(3000);
console.log("Listening on port 3000...");
