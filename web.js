var express = require('express')
  , app = express.createServer(express.logger())
  , pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , start = new Date()
  , port = process.env.PORT || 3000
  , client;

client = new pg.Client(connectionString);
client.connect();

app.get('/', function(req, res) {
  
});

app.listen(port, function() {
  console.log('Listening on:', port);
});
