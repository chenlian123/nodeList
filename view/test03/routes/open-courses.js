const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/',(req,res)=>{
    res.render("open-courses",{foo:'bar'})
});
  
  module.exports = router;