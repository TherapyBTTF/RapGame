var mysql = require('mysql')
const { HOST, PORT, USER, MDP, DATABASE } = require('./db.json')

const db = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: MDP,
    database: DATABASE
  })

db.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connecté à la BD.');
  }
});

module.exports=db;