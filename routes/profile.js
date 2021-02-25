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

app.get('/getProfile', function (req, res, next) {
  getProfile(req, res, next);

});

app.put('/updateProfile', function (req, res, next) {
  updateProfile(req, res, next);

});



function getProfile(req, res, next) {
  var data = req.body;

  var requestData = {
    "id": data.id
  }
  if (!data.email || !data.id) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query("SELECT * FROM user WHERE id= ?", [data.id], function (err, rows) {
        if (err) {
          reject("Error");
        } else {
          resolve('Profile get Successfuly!');
          return res.status(200).json({ message: "Profile get Successfuly", "statusCode": "200" });
        }
      });

    })
  }

  console.log("RequestData: ", requestData);
}

function updateProfile(req, res, next) {
  var data = req.body;

  var requestData = {
    "id": data.id,
    "email": data.email,
    "password": data.password,
    "gender": data.gender,
    "name": data.gender,
    "address": data.address,
    "dob": data.dob
  }
  if (!data.email || !data.id) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query('Update user SET ? ', requestData, function (err, rows) {
        if (err) {
          reject("Error");
        } else {
          resolve('Profile update Successfuly!');
          return res.status(200).json({ message: "Profile update Successfuly", "statusCode": "200" });
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
