var app = require('express')();
var http = require('http');
var socketio = require("socket.io");
const server = http.createServer(app)
const io = socketio(server)
var count = 0;
// WebSocket 连接服务器
io.on('connection', (socket) => {
  //// 所有的事件触发响应都写在这里
  setInterval(() => {
    count++
    //向建立该连接的客户端发送消息
    socket.emit('mynameEv', { name: "你我贷" + count })
  }, 1000)
  //监听客户端发送信息
  socket.on('yournameEv', function (data) {
    console.log(data)
  })
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/socket.html');
});
// 启用3000端口
server.listen(3000)