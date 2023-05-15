const express = require('express')
const cors = require('cors');
path = require ('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { ReadlineParser } = require('@serialport/parser-readline');
const {SerialPort} = require('serialport');
const {socket} = require('socket.io')

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
    origins: ['*'],
    methodes:['PUT', 'GET','DELETE','POST'],
    Credential:false,
  }
});

const portSerial = new SerialPort({ path:'/dev/ttyUSB0',
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: true
    });
const parser = portSerial.pipe(new ReadlineParser({ delimiter: '\r\n' })
)



//ECOUTER LES EVENNEMENTS DEPUIS LE FRONT


//ECOUTER LES EVENNEMENTS DEPUIS ESP32,ARDUINO,MEGA...

const info ={
  temperature:12,
  humidite:13,
  luminosite:14,
  humidite_sol:16
};
console.log(info)

setTimeout(()=>{
  console.log(info)
  io.emit('data', info);
},10)


parser.on('data', (data) => {
  io.emit('donnee', data);
  io.emit('data', info);
 /*  io.on('connection',function(socket){

    socket.on('ledOn',()=>{
      portSerial.write('1')
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrr');
  
    })  }); */
 /* c */
    
        io.on('connection',function(socket){

    
  
      });

  //console.log("en attente....");
console.log(data);
var donnee = data;
   io.emit('donnee', data);
   
  try {
  
    let jsonData = JSON.parse(dataStr)

    // If parsing succeeds, process the JSON data
    console.log('Received JSON:', jsonData);

    if (jsonData) {
      /* io.emit('donnee', `${jsonData.donnee}`); */
     
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
