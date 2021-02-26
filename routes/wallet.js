const e = require('express');
var express = require('express');
var conn = require('../node-mysql/config');
conn1 = conn.connection();
//var app = express.app();
var app = express();
var PORT = 3000;
/* GET users listing. */
app.get('/getWallet', function (req, res, next) {
  getWallet(req, res, next);
});

app.get('/transactionHistory', function (req, res, next) {
  getTransactionHistory(req, res, next);
});

app.post('/addPoints', function (req, res, next) {
  addPoints(req, res, next);

});

app.post('/updateWallet', function (req, res, next) {
  updateWallet(req, res, next);

});


function getWallet(req, res, next) {
  var data = req.body;

  var requestData = {
    "userid": data.userid
  }
  if (!data.userid) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query("SELECT * FROM user WHERE id= ?", data.userid, function (err, rows) {
        if (err) {
          reject("Error");
        } else {
          resolve('Post added Successfuly!');
          return res.status(200).json({ message: "Wallet get Successfuly", "statusCode": "200", data: rows });
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
          reject("Error");
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
          reject("Error");
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
