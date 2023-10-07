var express = require("express");
const nocache = require("nocache");
var router = express.Router();



//login user



//route for dashboard
router.get('/dashboard',(req,res)=> {
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.redirect("/");
    }
})

//route for logout
router.get('/logout', (req,res)=> {
    req.session.destroy(function(err) {
        if(err){
            console.log(err);
            return res.send("Error")
        }else{
            // res.render('base',{title:"Express",logout:"logout Successfully...!"});
            return res.redirect('/');
        }
    });
});

module.exports = router;