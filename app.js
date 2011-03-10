
/**
 * Module dependencies.
 */

var express = require('express'),
    io = require('socket.io'),
    json = JSON.stringify;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index.jade', {
    locals: {
        title: 'fxdevcon2010'
    }
  });
});

app.get('/himitsu', function(req, res) {
  res.render('index.jade', {
    locals: {
      title: 'fxdevcon2010 admin'
    },
    layout: 'himitsu.jade'
  });
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3003);
  console.log("Express server listening on port %d", app.address().port)
}

var socket = io.listen(app);
var count = 0;
var p = 'page1';
socket.on('connection', function(client) {
  count++;
  client.send(json({page: p}));
  client.send(json({count: count}));
  client.broadcast(json({count: count}));

  client.on('message', function(message) {
    var data = JSON.parse(message);
    if (data.page) {
      p = data.page;
      client.send(message);
      client.broadcast(message);
    }
  });

  client.on('disconnect', function() {
    count--;
    client.broadcast(json({count: count}));
  });
});

