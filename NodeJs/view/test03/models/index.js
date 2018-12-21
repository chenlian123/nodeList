const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
// 建立连接   数据库 用户名  密码  sequelize只能和关系型数据库打交道 不能mgDB
const sequelize = new Sequelize('kaikeba','kaikeba_admin','123456',{
    host:'localhost',
    dialect:'mysql',//数据库设置
    pool:{max:5,acquire:30000,idle:10000},//连接池
    timestamps:false,//禁止seq自动添加createdAt，updatedAt 数据库自动添加这两个字段
})
//sequelize建立自己的模型和数据库相应表打交道，所以第一步是建立自己的模型
const User = sequelize.define('user',{//表字段定义
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    age:Sequelize.INTEGER
})

// 同步数据库 force为true 会自动删除已存在的数据库表
User.sync({force:true}).then(()=>{
    // 、、插入若干测试数据
    User.create({
        firstName:"Tom",
        lastName:'Cruise'
    })
}).then(()=>{
    //查询前面插入的数据
    User.findAll().then(users=>{
        console.log(users)
    })
})

// 动态导入模型

const db = {Sequelize,sequelize};
//扫描读取当前目录中所有文件
fs.readdirSync(__dirname)
    .filter(file => (file !== 'index.js' && file !== 'db.js'))
    .forEach(file => { // 从文件中导入模型
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

module.exports = db;