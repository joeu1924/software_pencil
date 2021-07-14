const express = require('express')
const http = require('http');
const morgan = require("morgan")

/* se usara el layout */
const expressEjsLayout = require('express-ejs-layouts')


/* se usara la app Express */
const app = express();
const server = require('http').Server(app)
app.use(morgan('combined'))

/* EJS */
app.set('view engine','ejs');
app.set('layout', '../layouts/plantilla');
app.use(expressEjsLayout);

/* MAnejo de Sesion */
const session = require('express-session')
app.use(session ({
  secret : "incognito",
  resave : false,
  saveUninitialized : false
}))

/*Se empieza a usar las rutas*/

const r1 = require('./routes/rutas')
app.use('/',r1)


app.use(express.static(__dirname + "/public"))


//SE IMPLEMENTA ACA EL ZOOM
const io = require('socket.io')(server) //es una libreria para usa websocckets para comunicacion en
const { ExpressPeerServer } = require('peer'); //es una libreria q nos permitira conectarnos a otros equipos


const peerServer = ExpressPeerServer(server, {
    debug: true
  });

//importamos la libreria para poder tener los id unicos de las salas
const { v4: uuidV4 } = require('uuid');

app.use('/peerjs', peerServer);


/*app.set('views', './views');*/
app.set('view engine', 'ejs');

//necesario para crear el public url
app.use( express.static('public'))
//static sale amarillo en el video sale azul


app.get('saladelGranzoom/', (req, res) => {
    res.redirect(`/${uuidV4()}`) //se va rederigir al id unico
  })

//para poder tener los ids registrados en los URLs se crearan nuevos URLS

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
  })
  


//crear una public url para el server

//cuando el usuario entrara a la sala/room
//saber que el usuario se conecto||decir a toda la sala q uno se conecto
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {     
      socket.join(roomId)                               
      socket.to(roomId).broadcast.emit('user-connected', userId); 
      // messages
      socket.on('message', (message) => {
        //send message to the same room
        io.to(roomId).emit('createMessage', message)
    }); 
  
      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
    })
  })

//server.listen(process.env.PORT||3000)
//este ultimo es para heroko






/*
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

server.listen(3060)

