 function connect(){
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pizzeria"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
return con;
}
module.exports = {connect};