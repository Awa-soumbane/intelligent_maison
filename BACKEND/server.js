const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ReadlineParser } = require('@serialport/parser-readline');
const {SerialPort} = require('serialport');
const routes = require('../BACKEND/controllers/user.ctrl');
const { log } = require('console');
const DomoRouter = require('..//BACKEND/controllers/maisonRouter');
const app= express();


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

const servers = app.listen(port, () => {
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


const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});



var portSerial = new SerialPort({ path:'/dev/ttyUSB0',
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        //flowControl: true
    });
const parser = portSerial.pipe(new ReadlineParser({ delimiter: '\r\n' }))

//ECOUTER LES EVENNEMENTS DEPUIS LE FRONT
portSerial.on('open', () => {
  io.on('connection', (socket) => {

    socket.on('isOn', (msg) => {
      console.log('lampe: ' + msg);
      portSerial.write("1")
    });

    socket.on('isOff', (msg) => {
      console.log('lampe: ' + msg);
      portSerial.write("0")
    });

  });
});

//ECOUTER LES EVENNEMENTS DEPUIS ESP32,ARDUINO,MEGA...

parser.on('data', (data) => {
  
  console.log(data);
  
  
  try {
  let dataStr = data.toString();
  
  

    let jsonData = JSON.parse(dataStr)
console.log(jsonData)
    // If parsing succeeds, process the JSON data
    console.log('Received JSON:', jsonData);
    if (jsonData) {

      io.emit('temp', jsonData.temperature);
      io.emit('hum', jsonData.humidity); 
      io.emit('lum', jsonData.lum);
      io.emit('humSol', jsonData.humSol);
      io.emit('buzzer', jsonData.buzzer);
      io.emit('toit', jsonData.toit);
      io.emit('door', jsonData.door);

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
