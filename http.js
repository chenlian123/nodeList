const http  = require("http");
const server  = http.createServer((req,res)=>{
//req 请求头
//res 响应头  
res.writeHead(200,{
    'Content-type':'text/plain'
})
res.end('我服务器收到您的请求')
})

server.listen(3000)