const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcrypt')  
var localStorage = require('local-storage');
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



app.get('/register', async(req, res)=>{
    
    res.render('register')
})

app.get('/', async(req, res)=>{
    
     
        res.render('home')
    
   
})

app.get('/user/:id',async(req, res)=>{
    
    try{
    const user=await User.findById(req.params.id);
    if(user.isLoggedIn){
        res.render('userhome',{user:user})

    }else{
        res.redirect('/login')
    }
    }catch(error){
        console.log(error.message)
        res.redirect('/login')
    }

} )

app.post('/register', async(req, res)=>{
    
    const user=await User.findOne({email:req.body.email})
    if(req.body.password!=req.body.password2){

       console.log('err')


    }else if(user){
        console.log('user is already ')
        res.redirect('/register')

    }
    else{
        try{
            const user=new User({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                password:req.body.password,
                isLoggedIn:true
            });
    
            await user.save();
            res.redirect('/user/'+""+user._id+"")
        }catch(err){
            console.log(err.message)
            res.redirect('/register')
        }
    
    }
    
})

app.get('/login', (req, res)=>{
    
    res.render('login')
})

app.post('/login', async(req, res)=>{
    
     const user = await User.findOne({email:req.body.email})
    if(!user){
        console.log('wrong email')
    res.redirect('/login')
    }
    else if (user && user.password!=req.body.password){
        console.log('wrong password')
        res.redirect('/login')
    }else{
        req.header.email=user.email;
        user.isLoggedIn=true
        await user.save()
        console.log('success')
        res.redirect('/user/'+""+user._id+"")}
})

app.post('/logout/:id',async(req, res)=>{
    const user=await User.findById(req.params.id)
     user.isLoggedIn=false;
     await user.save();
     res.redirect('/')

})
