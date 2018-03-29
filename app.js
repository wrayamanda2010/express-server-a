const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/hello', (req, res, next) => {
  res.json({message: 'world!'})
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: 'not found'}})
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)
