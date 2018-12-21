const mysql = require('mysql');
const cfg = {
    host:'localhost',
    user:'kaikeba_admin',
    password:"123456",
    database:"kaikeba"
}

//创建连接的方式
// module.exports = {
//     query:function(sql,value){
//             return new Promise((resolve,reject)=>{
//             // 创建连接
//             const conn =  mysql.createConnection(cfg)
//             conn.connect()//此步可省
//             conn.query(sql,value,(err,results)=>{
//                 if(err) reject(err)
//                 else resolve(results);
//                  conn.end();                  
//             });
   
//             })


//     }
// }
//连接池
const pool= mysql.createPool(cfg);
module.exports = {
    query:function(sql,value){
            return new Promise((resolve,reject)=>{
            pool.getConnection((err,conn)=>{
            conn.query(sql,value,(err,results)=>{
                if(err) reject(err)
                else resolve(results);
                     
            });
              conn.release();   //释放      
            })
        })
    }
}

//也可以这样去写连接池   缓存多个连接，用户查询使用，不用频繁打开关闭连接 
// const pool= mysql.createPool(cfg);
// module.exports = {
//     query:function(sql,value){
//             return new Promise((resolve,reject)=>{
//                 pool.query(sql,value,(err,results)=>{
//                     if(err) reject(err)
//                     else resolve(results);
                         
//                 });
//         })
//     }
// }