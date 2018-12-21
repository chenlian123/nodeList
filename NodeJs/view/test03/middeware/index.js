const {query} = require('../models/db');
let coursesCache = null;
module.exports.initLocals = async function(req,res,next){
    const isLogin = true;
    //确定动态导航栏的名字
    res.locals.navvName = isLogin?'nav':'nav-unauth';

    if(coursesCache){
        res.locals.courses = coursesCache;
        next();//进入后续中间件
    }else{
    const sql = 'SELECT * FROM kaikeba.vip_course;';
    const courses = await query(sql);
    try{
              //cooperation 处理一下
        courses.forEach(course=>
            course.cooperation = course.cooperation.split(','));
            console.log(courses);
            coursesCache =res.locals.courses = courses;
            next();//进入后续中间件     
    }catch(e){
        next(e);
    }
 

       

    }      
    }




    //将VIP的菜单数据存放至res.locals中
    // res.locals.courses = [
    //     {
    //         url:"/vip-courses/web",
    //         icon:"https://img.kaikeba.com/web_menu.png",
    //         name:"WEB全栈架构师",
    //         desc:"授课深度对标百度",
    //         cooperation:[
    //                     "https://img.kaikeba.com/baidu.png",
    //                     "https://img.kaikeba.com/toutiao.png",],
    //         poster:"https://img.kaikeba.com/web_vip.png"

    //     },
    //     {
    //         url:"/vip-courses/python",
    //         icon:"https://img.kaikeba.com/web_menu.png",
    //         name:"pythpn爬虫",
    //         desc:"授课深度对标百度",
    //         cooperation:[
    //             "https://img.kaikeba.com/baidu.png",
    //             "https://img.kaikeba.com/toutiao.png",],
    //     poster:"https://img.kaikeba.com/web_vip.png"

    //     }
    // ];
  
