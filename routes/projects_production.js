var mongo = require('mongodb');

var seedData = [
  {
    title: "Arduinode",
    image: "arduinode.png",
    date: "November 2015",
    github: "https://www.github.com/keithomalley/arduinode",
    description: "This was a project where I made a controller out of an Arduino board, with various components that sent the inputs through Serial to a node server on my laptop, and into a html5 canvas game where they were used to control the character.",
    technology_used: ["Node", "Arduino", "HTML5 Canvas", "CSS3", "Javascript", "LEGO", "Photoshop", "Illustrator"]
  },
  {
    title: "Party Time",
    image: "partytime.png",
    date: "December 2015",
    github: "https://www.github.com/keithomalley/partytime",
    description: "This was a fun little project built using jQuery and AJAX requests to make a to-do list application.",
    technology_used: ["jQuery", "AJAX", "HTML5", "CSS3", "Javascript", "Photoshop", "Illustrator"]
  }
];

var uri;

mongo.MongoClient.connect(uri, function(err,db){
  if(err) throw err;

  var projects = db.collection('projects');

  projects.insert(seedData, function(err, result){
    if(err) throw err;
  })
});



var Server = mongo.Server,
  Db = mongo.Db;
var BSON = require('bson').BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('projectsdb', server);

db.open(function(err, db) {
  if(!err){
    console.log("Connected to database");
    db.collection('projects', {strict:true}, function(err, collection){
      if(err){
        console.log("The projects collection does not exist");
        populateDB();
      }
    });
  }
});

exports.findAll = function(req, res){
  db.collection('projects', function(err, collection){
    collection.find().toArray(function(err, items){
      res.send(items);
    });
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  console.log("Retrieving project: " + id);
  db.collection('projects', function(err, collection){
    collection.findOne({'_id': new BSON.ObjectID(id), function(err, item){
      res.send(item);
    }});
  });
}

exports.addProject = function(req, res){
  var project = req.body;
  console.log("Adding Project: " + JSON.stringify(project));
  db.collection('projects', function(err, collection){
    collection.insert(project, {safe:true}, function(err, result){
      if(err){
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateProject = function(req, res){
  var id = req.params.id;
  var project = req.body;
  console.log("Updating Project: " + id);
  console.log(JSON.stringify(project));
  db.collection('projects', function(err, collection){
    collection.update({'_id':new BSON.ObjectID(id)}, project, {safe:true}, function(err, result){
      if(err){
        console.log('Error updating project: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log("" + result + " document(s) updated");
        res.send(project);
      }
    });
  });
}


exports.deleteProject = function(req, res){
  var id = req.params.id;
  console.log('Deleting project: ' + id);
  db.collection('projects', function(err, collection){
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if(err){
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}



/*=========================================================*/

var populateDB = function(){


  db.collection('projects', function(err, collection) {
    collection.insert(projects, {safe:true}, function(err, result){});
  });
}
