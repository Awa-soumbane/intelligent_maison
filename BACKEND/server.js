const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { ReadlineParser } = require('@serialport/parser-readline');
const {SerialPort} = require('serialport');
// Express APIs
const api = require('./controllers/user.ctrl');
const { log } = require('console');

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
const app= express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors({origin: "*"}))

// Serve static resources
app.use('/api', api)

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
    origins: ['http://localhost:3001']
  }
});

const portSerial = new SerialPort({ path:'/dev/ttyACM0',
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        //flowControl: true
    });
const parser = portSerial.pipe(new ReadlineParser({ delimiter: '\r\n' })
)


//ECOUTER LES EVENNEMENTS DEPUIS LE FRONT
portSerial.on('open', () => {
  io.on('connection', (socket) => {

  });
});

//ECOUTER LES EVENNEMENTS DEPUIS ESP32,ARDUINO,MEGA...

parser.on('data', (data) => {
  console.log(data)
  //console.log("en attente....");
  tp = data.split('/'); 
  var donnee = data.slice(0);
  console.log(donnee);
   io.emit('data',{'donnee':donnee});
   io.emit('donnee', donnee);
  try {
  
    let jsonData = JSON.parse(dataStr)

    // If parsing succeeds, process the JSON data
    console.log('Received JSON:', jsonData);

    if (jsonData) {
      io.emit('donnee', `${jsonData.donnee}`);
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
    

   

  

      if ((heur == 08 && min == 00 && sec == 00) || (heur == 19 && min == 00 && sec == 00)) {

        setTimeout(() => {
          const collection = database.collection('domotique');

          collection.insertOne(tempEtHum, function (err) {
            if (err) throw err;
            console.log("Data inserted successfully!");
          });
        }, 1000);
      }

    }
  
  } catch (error) {
    // throw error
  }
})
