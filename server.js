var express = require('express'),
  projects = require('./routes/projects');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.configure(function (){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

app.get('/', projects.findAll);
app.get('/projects', projects.findAll);
app.get('/projects/:id', projects.findById);
app.post('/projects', projects.addProject);
app.put('/projects/:id', projects.updateProject);
app.delete('/projects/:id');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
