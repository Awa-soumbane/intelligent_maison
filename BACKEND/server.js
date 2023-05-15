const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { ReadlineParser } = require('@serialport/parser-readline');
const {SerialPort} = require('serialport');
// Express APIs
const api = require('./controllers/user.ctrl');
const { log } = require('console');
const DomoRouter = require('..//BACKEND/controllers/maisonRouter');
const app= express();

//const app_io = require('./arduino')

mongoose
  .connect('mongodb+srv://oumy:1234@cluster0.ayfcz7h.mongodb.net/maison')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })





//formatage datas 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors({origin: "*"}))

// Serve static resources
app.use('/api', routes)


// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204))

// Define PORT
 const port = process.env.PORT || 4002

const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Something went wrong'))
  })
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})


//const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origins: ['http://localhost:3001']
  }
});

const portSerial = new SerialPort({ path:'/dev/ttyACM0',
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: true
    });
const parser = portSerial.pipe(new ReadlineParser({ delimiter: '\r\n' })
)





//ECOUTER LES EVENNEMENTS DEPUIS ESP32,ARDUINO,MEGA...



//ECOUTER LES EVENNEMENTS DEPUIS LE FRONT
parser.on('data', (data) => {
  console.log(data)
  console.log("en attente....");
  
  
  try {
  let dataStr = data.toString();
  
  

    let jsonData = JSON.parse(dataStr)
console.log(jsonData)
    // If parsing succeeds, process the JSON data
    console.log('Received JSON:', jsonData);
    if (jsonData) {

      io.emit('temp', `${jsonData.temp}`);
      io.emit('hum', `${jsonData.hum}`);
      io.emit('lum', `${jsonData.lum}`);
      io.emit('sol', `${jsonData.sol}`);
     

      let tempEtHum = {
        'temp': jsonData.temp,
        'hum': jsonData.hum,
        'dateInsertion': new Date(),
        'lum': jsonData.lum,
        'sol': jsonData.sol,
      };
  

 


    }
  
  } catch (error) {
    // throw error
  }
})

//ECOUTE DU SERVER SUR LE PORT 3000
http.listen(3000, () => {
  console.log('listening on :3000');
});

