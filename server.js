const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatlit = new Chatkit.default({
  instanceLocator: 'v1:us1:92f6e0ea-dddd-478f-bca6-17bbc528eb78',
  key: '4de29796-bdc7-4354-9ab7-48054f982b89:rCt9t+nQ9WKe0MX9hZWSapg8zIKgXch4jgnOB4fGefg=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.send(error.status).json(error)
      }
    })
})

app.post('authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
