const express = require('express')
const app = express()
const  Router = require('./routes/router')
const mongoose = require('mongoose')
var compression = require('compression')


let user={isLoggedIn: false};
//database
const dbURI = "mongodb+srv://yacoub2:200748770@cluster0.sxa4m.mongodb.net/login?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true ,useUnifiedTopology:true})
.then((result)=>{console.log('***** Server and database connected ;) *****');


})
.catch((err)=>{err.message})

const port=process.env.PORT ||3000;
app.listen(port)
app.use(compression())

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extends :true}))

app.use('/',Router)

