import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

app.post('/device/onoff', (req, res) => {
  const data = req.body

  axios
    .post('https://openapi.api.govee.com/router/api/v1/device/control', data, {
      headers: {
        'Content-Type': 'application/json',
        'Govee-API-Key': process.env.VITE_KEY
      }
    })
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Internal Server Error')
    })
})

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`)
})
