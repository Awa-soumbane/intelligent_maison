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
const userSchema = require('../BACKEND/models/User')



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


/* const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
}); */

 // Création de notre serveur
 //const server = http.createServer(app);
 const io = require('socket.io')(server, {
     cors: {
       origin: "*",
       methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
       credentials: false
     }
   });

var portSerial = new SerialPort({ path:'/dev/ttyACM0',
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

    socket.on('enf', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });

    socket.on('sal', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });

    socket.on('loc', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });

    socket.on('par', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });
    socket.on('switch', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });

    socket.on('donn', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });
    socket.on('lumiere', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });
    socket.on('donnN', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });

    socket.on('fan', (msg) => {
      portSerial.write(msg)
      console.log(msg);
    });

  });
});

//ECOUTER LES EVENNEMENTS DEPUIS ESP32,ARDUINO,MEGA...

parser.on('data', (data) => {
  
  //io.emit("parent",data);

  /* const info = new this.information({
    temperature: temperature,
    humidite: humidity,
    humidite_sol: humSol,
    lumiere: lum,
   
  }); */
 /*  */
  //console.log(data); 
  
  const rfid = data.toString();
/* if(rfid!='fermer'){ */
  // Vérification de la valeur et recherche de l'enregistrement correspondant dans la base de données
  //if (rfid) {
    userSchema.findOne({rfid})
      .then((record) => {
        if (record) {
          portSerial.write('1');
          console.log('Matching record found:', record);
          io.emit("donnee",data);
          // Effectuer des opérations supplémentaires si nécessaire
        } else if(rfid == 'fermer'){
          io.emit("donnee",data);
        }
      })
      /* .catch((err) => console.error('Error finding record:', err));
  } else {
    console.error('Invalid value received from serial port:', data);
  } */
  /* }
  else */ 

  /* const rfid = data.toString();
  if(data!='fermer'){
    // Vérification de la valeur et recherche de l'enregistrement correspondant dans la base de données
      userSchema.findOne({rfid})
        .then((record) => {
          if (record) {
            portSerial.write('1');
            console.log('Matching record found:', record);
            io.emit("donnee",data);
            // Effectuer des opérations supplémentaires si nécessaire
          } else {
            //console.log('No matching record found');
          }
        })
        .catch((err) => console.error('Error finding record:', err));
    }
    else if(data =='fermer'){
      io.emit("donnee",data);
    } 

  io.emit("donnee",data);*/
  
  try {
  let dataStr = data.toString();
  
  

    let jsonData = JSON.parse(dataStr)
    //console.log(jsonData)
    // If parsing succeeds, process the JSON data
    console.log('Received JSON:', jsonData);
    if (jsonData) {

      io.emit('realtime', jsonData);
     /*  io.emit('hum', jsonData.humidity); 
      io.emit('lum', jsonData.lum);
      io.emit('humSol', jsonData.humSol);
      io.emit('buzzer', jsonData.buzzer);
      io.emit('toit', jsonData.toit);
      io.emit('door', jsonData.door); */

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
/* http.listen(3000, () => {
  console.log('listening on :3000');
}); */
