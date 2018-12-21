const express = require('express');
const router = express.Router();
const createError = require('http-errors');//创建错误对象
/* GET users listing. */
router.get('/:course',(req,res,next)=>{
    res.locals.bar = 'foo';//locals傳參
    // 查询参 req.query
    console.log(req.params.course);
    let title = getTitle(res,req.params.course)
    if(title){
        res.render("vip-course/"+req.params.course,{
          title,
          birthday:new Date(),
          a:true,
          b:true

        })
    }else{
      //错误处理方式一:执行next函数创建错误对象
      // next(new Error("没有您要的课程"))//错误状态默认500 
      // next(createError(404,"没有您要的课程"))//指定状态码404
      //错误处理方式二:重定向 res.redirect
      res.redirect('/vip-courses/web')
    }
});
//获取当前页面的标题
  function getTitle(res,course){
      for(const c of res.locals.courses){
          if(c.url.indexOf(course)!==-1){
            return c.name
          }
      }
    return ''
  }
  module.exports = router;