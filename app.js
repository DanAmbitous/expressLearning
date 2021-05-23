const express = require('express')
const app = express()
const PORT = process.env.PORT || 9886
const body = require('body-parser')
const { response } = require('express')
const fs = require('fs') 
const Datastore = require('nedb')

app.use(express.static('public'))
app.use(express.json())

app.listen(PORT, () => console.log(`Connected to port ${PORT}`))

/* 

Goals

1. Server web pages (HTML, CSS, JS, etc...)
1_A. index.html


*/

const geoLocationArray = []

const database = new Datastore('database.db')
// It's going to load database.db created if doesn't exist
database.loadDatabase()

app.get('/api', (req, res) => {
  database.find({}, (error, data) => {
    if (error) {
      res.send(error)
    }

    res.json(data)
  })
})

app.post('/api', (req, res) => {
  console.log(req.body)

  // fs.appendFile("geoLocationData.txt",  JSON.stringify(geoLocationArray),function(err){
  //   if(err) throw err;
  //   console.log('IS WRITTEN')
  // });

  database.insert(req.body)
  // geoLocationArray.push(req.body)
  // console.log(geoLocationArray)
  res.json({
    status: 'Success',
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    date: req.body.date,
    name: req.body.name
  })
})

/* 

Establising connections between client and server to send data from the client to the server, and then a response a back to the client from the server

1. (client) get the geograhic locations
2. (client) save the geographic locations within an array
3. (client) create an object, named whatever like options, to be used within a fetch method with the POST method, the object can look like this
const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
4. (client) send the data inside the fetch method
5. (server) use the post method with app, which by conviention is the express function
6. (server) log hte request body, make sure it's parsed as JSON with app.use(express.json()) to show
7. (server) A response can be sent back, such as an object that takes in each value and returns it

*/

/* 

const data = { latitude, longitude }
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
        const response = await fetch('/api', options)
        const jsonData = await response.json()
        console.log(jsonData)

*/