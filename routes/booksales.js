const e = require('express');
var express = require('express');
var conn = require('../node-mysql/config');
conn1 = conn.connection();
//var app = express.app();
var app = express();
var PORT = 3000;
/* GET users listing. */
app.get('/getBookList', function (req, res, next) {
  getBookList(req, res, next);
});

app.get('/bookdetails', function (req, res, next) {
  getBookDetails(req, res, next);
});

app.put('/updateWallet', function (req, res, next) {
  updateWallet(req, res, next);

});


function getBookList(req, res, next) {
  var data = req.body;

  var requestData = {
    "id": data.id
  }
  if (!data.id) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query("SELECT * FROM books WHERE userid= ?", data.id, function (err, rows) {
        if (err) {
          return res.status(400).json({ message: err, statusMessage: "400" });
        } else {
          resolve('books get Successfuly!');
          return res.status(200).json({ message: "Books get Successfuly", "statusCode": "200", data: rows });
        }
      });

    })
  }

  console.log("RequestData: ", requestData);
}

function getBookDetails(req, res, next) {
  var data = req.body;

  var requestData = {
    "id": data.id
  }
  if (!data.id) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query("SELECT * FROM books WHERE id= ?", data.id, function (err, rows) {
        if (err) {
          return res.status(400).json({ message: err, statusMessage: "400" });
        } else {
          resolve('Book details get Successfuly!');
          return res.status(200).json({ message: "Book details get Successfuly", "statusCode": "200", data: rows });
        }
      });

    })
  }

  console.log("RequestData: ", requestData);
}

function updateWallet(req, res, next) {
  var data = req.body;

  var requestData = {
    "id": data.id,
    "points": data.points,
  }
  if (!data.id) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {

      conn1.query('Update user SET ? where id=?', [requestData, data.id], function (err, rows) {
        if (err) {
          return res.status(400).json({ message: err, statusMessage: "400" });
        } else {
          resolve('Wallet updated Successfuly!');
          return res.status(200).json({ message: "Wallet updated Successfuly", "statusCode": "200" });
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
