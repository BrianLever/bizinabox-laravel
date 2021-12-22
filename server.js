require('dotenv').config()

const SOCKET_PORT = process.env.SOCKET_PORT
const REDIS = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  family: 4,
  db: process.env.REDIS_SOCKET_DB
}
const PREFIX = process.env.REDIS_PREFIX

var ioRedis = require('ioredis')
var redis = new ioRedis(REDIS)

if (process.env.APP_ENV === 'staging') {
  var fs = require('fs')
  var app = require('https').createServer({
    key: fs.readFileSync('./ssl/private.key').toString(),
    cert: fs.readFileSync('./ssl/certificate.crt').toString()
  })
}

if (process.env.APP_ENV === 'local') {
  var app = require('http').createServer()
}

var io = require('socket.io').listen(app)

app.listen(SOCKET_PORT, function () {
  console.log(new Date() + ' - Server is running on port ' + SOCKET_PORT + ' and listening Redis on port ' + REDIS.port + '!')
})

io.on('connection', function (socket) {
  socket.on('joinguest', (data) => {
    try {
      let channel = PREFIX + 'guest-' + data
      socket.join(channel)
    } catch (err) {
      console.log('joinguest:' + err.messagee)
    }
  })
  socket.on('joinuser', (data) => {
    try {
      let channel = PREFIX + 'user-' + data
      socket.join(channel)
    } catch (err) {
      console.log('joinuser:' + err.messagee)
    }
  })
  socket.on('jointeam', (data) => {
    try {
      let channel = PREFIX + 'team-' + data
      socket.join(channel)
    } catch (err) {
      console.log('jointeam:' + err.messagee)
    }
  })
  socket.on('guest-typing', (data) => {
    try {
      var channel = PREFIX + 'guest-' + data.to_id
      io.to(channel).emit('guest-typing', data)
    } catch (err) {
      console.log('guest-typing:' + err.messagee)
    }
  })
  socket.on('user-typing', (data) => {
    try {
      var channel = PREFIX + 'user-' + data.to_id
      io.to(channel).emit('user-typing', data)
    } catch (err) {
      console.log('user-typing:' + err.messagee)
    }
  })
  socket.on('team-typing', (data) => {
    try {
      var channel = PREFIX + 'team-' + data.to_id
      io.to(channel).emit('team-typing', data)
    } catch (err) {
      console.log('team-typing:' + err.messagee)
    }
  })
  socket.on('guest-end', (data) => {
    try {
      var channel = PREFIX + 'guest-' + data.id
      io.to(channel).emit('guest-end', data)

      io.of('/')
        .in(channel)
        .clients((error, socketIds) => {
          if (error) throw error
          socketIds.forEach((socketId) => io.sockets.sockets[socketId].leave('chat'))
        })
    } catch (err) {
      console.log('guest-end:' + err.messagee)
    }
  })
})

redis.psubscribe('*')

redis.on('pmessage', function (subscribed, channel, data) {
  try {
    io.to(channel).emit(JSON.parse(data).emit, data)
  } catch (err) {
    console.log('pmessage:' + err.messagee)
  }
})
