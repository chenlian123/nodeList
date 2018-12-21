var hbs = require('hbs');//导入hsb，扩展handlebars 视图引擎的帮助方法
const moment = require("moment");
const path = require("path");
const helpers = require("handlebars-helpers") ;

helpers.comparison({handlebars:hbs.handlebars})

hbs.registerPartials(path.join(__dirname,'../views/partials'))

hbs.registerHelper('addOne',function(num){
    return ++num  
  })
  hbs.registerHelper('minusOne',function(num){
    return --num
  })
  
  hbs.registerHelper('date',function(date,format){
      const m = moment(date);
      if(m){
        return m.format(format)
      }else{
        return '';
      }
  })

// 注册扩展代码块
const blocks = {};//代码块缓存对象
hbs.registerHelper('extend',function(name,context){
    //context 是上下文，保存有用方法和数据，最后一个参数永远是context
    let block = blocks[name]//block用来存放代码块
    if(!block){
        block = blocks[name]=[];
    }
    // 编译指令中代码块并放入block
    block.push(context.fn(this))
})

hbs.registerHelper('block',function(name){
   const val = (blocks[name]||[]).join('\n');
   blocks[name] = [];
   return val;
})

// 动态partial
hbs.registerHelper('whichPartial',function(name){
    return name;
})
// 动态partial
hbs.registerHelper('link',function(options){
    //new hbs.SafeString()把输出内容当做html来解析 也可以用三大括号{{{link text="开课吧" href="http://www.kaikeba.com" style="color:red"}}}
    //hbs.Utils.escapeExpression 就是把html转成字符串输出
    const {text,href,style} = options.hash
    return new hbs.SafeString(`<a href='${href}' style='${style}'>${text}</a>`) ;
})

// 获取时间的一部分
hbs.registerHelper('partOfDate',function(str,part,index){
    const data = new Date(str);
    if(part=='d'){
        return data.getDate();
    }else if(part=='M'){
        return ''+(data.getMonth()+1)
    
    }else if(part=='h'){
        let h = data.getHours();
        h = h<10?(0+h):h.toString();
        return h[index];
    }else if(part=='m'){
        let m = data.getMinutes();
        m = m<10?(0+m):m.toString();
        return m[index];
    }else{
        return '';
    }
})