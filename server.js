
var express = require('express');
var pg = require("pg");
var app = express();


var connectionString = "postgres://postgres:admin@localhost:5432/supergirosDB";

var client = new pg.Client(connectionString);


// Metodo Registrar
app.get('/register', function (req, res, next) {
  pg.connect(connectionString,function(err,persons,done) {
    persons.query('INSERT INTO test (id, dato) VALUES ($1,$2)',['03','Dato 03'],function(err,result) {
        done(); // closing the connection;
        if(err){
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
  })
})

// Metodo consultar 
app.get('/', function (req, res, next) {
  pg.connect(connectionString,function(err,persons,done) {
    if(err){
      console.log("not able to get connection "+ err);
      res.status(400).send(err);
    }else{
      console.log('Conexión establecida....');
    } 
    persons.query('SELECT nombres, apellidos FROM personas where estado = $1', ['Activo'],function(err,result) {
      done(); // closing the connection;
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});

// Metodo modificar
app.get('/Actualizar',function(req, res, next) {
  
})

// Metodo lsitar general
app.get('/listStudent', function (req, res, next) {
  pg.connect(connectionString,function(err,persons,done) {
    if(err){
      console.log("not able to get connection "+ err);
      res.status(400).send(err);
    } 
    persons.query('SELECT * from GetAllPersons()' ,function(err,result) {
      done(); // closing the connection;
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});
 
app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});   