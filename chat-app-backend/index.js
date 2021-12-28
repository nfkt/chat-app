const app = require('express')()
const http = require('http').createServer(app)
const { Server } = require("socket.io");

var cors = require('cors');
app.use(cors());

const io = new Server(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

io.on('connection', socket => {

  socket.on('message', ({ name, message }) => {
    if(name === 'NIhal'){
    io.emit('message', { name, message })
    }
    console.log({name, message})
  })
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})

 /* 
 
 const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

 **/