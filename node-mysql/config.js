const mysql = require('mysql');

function connection() {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'poetryworld'
  });
  connection.connect((error) => {
    if (!!error) {
      console.log(error);
    } else {
      console.log('Connected!:)');
    }
  });
  return connection;
}


exports.connection = connection;