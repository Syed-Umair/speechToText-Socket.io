var io = require('socket.io').listen(7222);
var fs = require('fs-extra');
var chokidar = require('chokidar');
var userList = fs.readJSONSync('./SpeechToText-userList.json').users;
console.log("Initialized User List");
var watcher = chokidar.watch('./SpeechToText-userList.json');
io.sockets.on('connection', function (socket){
  socket.emit('speechToTextUserList', userList);
  watcher.on('change', function(){
    userList = fs.readJSONSync('./SpeechToText-userList.json').users;
    console.log("User List is modified", userList);
    socket.emit('speechToTextUserList', userList);
  })
});