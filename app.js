const express=require("express");
const cors=require("cors");

const app=express();
const http = require('http').createServer(app);
const io=require("socket.io")(http,{ cors: {
    origin: '*',
  }});
  app.use(cors());
io.on("connection",function(socket){
    console.log(`${socket.id}this is socket`);
    socket.on("mousedown",function(data){
       socket.broadcast.emit("md",data);
    })
    socket.on("mousemove",function(data){
        socket.broadcast.emit("mm",data);
    })
})
app.get("/",function(req,res){
    res.send("<h1>welcome home </h1>")
})
let port=process.env.PORT||3000

http.listen(port,function(){
    console.log("running at: 3000");
})