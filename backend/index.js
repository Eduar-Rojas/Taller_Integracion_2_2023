const express = require('express')
const app = express() //  Aplicación Express
const db = require('./db.js')

//  Especifico la consulta SQL
const sqlQuery = 'SELECT * FROM clientes'

//  Uso la consulta a la base de datos
db.query(sqlQuery)
  .then(data => {
  // Maneja los resultados aquí
    console.log('Resultados de la consulta:', data)
  })
  .catch(error => {
  // Maneja los errores aquí
    console.error('Error al ejecutar la consulta:', error)
  })

app.listen(3000)
console.log(`Server on port ${3000}`)