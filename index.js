
const fs = require("fs");
//异步读取文件
fs.readFile('./note.md',(error,data)=>{
    console.log("异步的读取"+data)
})
const data = fs.readFileSync("./note.md");
console.log("同步读取"+data)
console.log("run!")
//node异步能力