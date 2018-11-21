const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/',(req,res)=>{
    res.locals.bar = 'foo';//locals傳參
    res.render("vip-courses",{bar:'bar'})

});
  
  module.exports = router;