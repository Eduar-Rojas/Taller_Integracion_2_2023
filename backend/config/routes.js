const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hola mundo, pagina raiz')
})

//  Responde String
app.get('/about', (req, res) => {
  res.send('Pagina acerca de... ')
})

// Responde con una imágen \
// app.get('/imagenes', (req, res) => {
//   res.sendFile('./10.jpg')
// })

//  Responde con un Json
app.get('/user', (req, res) => {
  res.json({ name: 'Eduardo' })
})

// Responde con un status
app.get('/vivo', (req, res) => {
  res.sendStatus(204)
})

//  Cualquier pagina que no exista... Responde:
// app.use((req, res) => {
//   res.status(404).send('La página no se ha encontrado...!!!!')
// })

app.listen(3000)
console.log(`Server on port ${3000}`)
