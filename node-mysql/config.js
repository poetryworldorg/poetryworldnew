const mysql = require('mysql');

function connection(){
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'poetryworld'
      });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
      });
  }
  
  
exports.connection=connection;