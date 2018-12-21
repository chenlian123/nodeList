const express = require('express');
const router = express.Router();

router.get('/',async (req,res,next)=>{
    res.redirect('/admin/open-courses')

})
router.get('/open-courses',async(req,res,next)=>{
            res.render('admin/open-courses',{
                layout:'layout-admin',
            })
})
//处理公开课的新增
router.post('/open-courses',async(req,res,next)=>{
    res.render('admin/open-courses',{
        layout:'layout-admin',
    })
})


router.get('/vip-courses',async(req,res,next)=>{
    res.render('admin/vip-courses',{
        layout:'layout-admin',
    })
})
module.exports = router;