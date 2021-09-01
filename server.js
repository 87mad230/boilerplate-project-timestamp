// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// :)
app.get("/api/:date?", (req,res)=> {
    let date = req.params.date;
  if (/\d{4}-\d{1,2}-\d{1,2}/.test(date)) {
      let DateObject = new Date(date);
    res.json({ unix: DateObject.valueOf(), utc: DateObject.toString().slice(0, DateObject.toString().length - 11)})
    }
    else if (/\d+/.test(date)) {
      let DateObject = new Date(parseInt(date));
      res.json({ unix: date, utc: DateObject.toString()});
    }
    else {
      res.json({error: "Invalid Date" });
    }
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
