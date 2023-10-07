const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache");
const { v4:uuidv4 } = require("uuid");
const router = require('./router')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(nocache());

// set view engine and dirname

app.set('view engine','ejs');
//load static assets

app.use('/static',express.static(path.join(__dirname,'public')));

//session middleware
app.use(session({
    secret:uuidv4(),// '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave:false,
    saveUninitialized: false,
}));


//route middleware
app.use('/route',router);


//home route

const credential = {
    email:"admin@gmail.com",
    password:"admin123"
}; 
app.get('/', nocache(), (req,res)=>{
    if(req.session.user) {
        return res.redirect("/route/dashboard");
     }
    return res.render('base',{title:"Login System"});
})
router.post('/login',(req,res)=> {
    try {
    if(req.body.email === credential.email && req.body.password === credential.password){
        req.session.user = req.body.email;
        return res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }else{
        return res.render("base", { message: "Invalid Email or Password" });
    }
} catch (err){
    console.log(err);
    res.status(500).send("Internal server Error");
}
});

//Start the server
app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:3000")});