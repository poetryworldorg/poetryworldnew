const e = require('express');
var express = require('express');
var conn = require('../node-mysql/config');
conn1 = conn.connection();
//var app = express.app();
var app = express();
var PORT = 3000;
/* GET users listing. */
app.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

app.post('/post', function (req, res, next) {
  post(req, res, next);

});

app.post('/likes', function (req, res, next) {
  likes(req, res, next);

});

app.post('/comment', function (req, res, next) {
  comment(req, res, next);

});


function post(req, res, next) {
  var data = req.body;

  var requestData = {
    "text": data.text,
    "userid": data.userid,
    "background": data.background,
    "font": data.font,
    "time": data.time
  }
  if (!data.text || !data.userid) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query('INSERT INTO post SET ?', requestData, function (err, rows) {
        if (err) {
          return res.status(400).json({ message: err, statusMessage: "400" });
        } else {
          resolve('Post added Successfuly!');
          return res.status(200).json({ message: "Post added Successfuly", "statusCode": "200" });
        }
      });

    })
  }

  console.log("RequestData: ", requestData);
}

function likes(req, res, next) {
  var data = req.body;
  var requestData = {
    "postid": data.postid,
    "likes": data.likes,
    "userid": data.userid,
    "time": data.time,
    "status": '0'
  }
  if (!data.postid || !data.userid) {
    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query('INSERT INTO post_likes SET ?', requestData, function (err, rows) {
        if (err) {
          return res.status(400).json({ message: err, statusMessage: "400" });
        } else {
          resolve('Likes added Successfuly!');
          return res.status(200).json({ message: "Likes added Successfuly", "statusCode": "200" });
        }
      });

    })
  }
  console.log("RequestData: ", requestData);

}

function comment(req, res, next) {
  var data = req.body;
  var requestData = {
    "postid": data.postid,
    "comment": data.likes,
    "userid": data.userid,
    "time": data.time,
    "status": '0'
  }
  if (!data.postid || !data.userid) {
    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query('INSERT INTO post_likes SET ?', requestData, function (err, rows) {
        if (err) {
          return res.status(400).json({ message: err, statusMessage: "400" });
        } else {
          resolve('Likes added Successfuly!');
          return res.status(200).json({ message: "Likes added Successfuly", "statusCode": "200" });
        }
      });

    })
  }
  console.log("RequestData: ", requestData);

}
// app.listen(PORT, function(err){ 
//   if (err) console.log(err); 
//   console.log("Server listening on PORT", PORT); 
// });
module.exports = app;
