const express = require('express')
const hbs = require('hbs')
const path = require('path')
const fs =require('fs')
const tripsfile = require('./add.js')

const directory = path.join(__dirname,'/public')
partials = path.join(__dirname,'/views/partials')

const app = express()
const port = process.env.PORT || 3000
app.use(express.static(directory))
app.set('view engine','hbs')
// hbs.registerPartials(partials)

app.use(express.urlencoded({ extended : false }))

app.get('',(req,res)=>{
    res.render('index')
})

// // login

// app.get('/login',(req,res)=>{
//     res.render('login')
// })

// // making login

// app.post('/login',(req,res)=>{
    
// const opt =  tripsfile.login(req.body)
// if(opt === true){
//   res.redirect('/user')
// }
// else{
//   res.send('<h1> Not an User. <a href="/register">Register </a> </h1>')
// }
// })

// //register 
// app.get('/register',(req,res)=>{
//      res.render('register')
// })

// // make register

// app.post('/register',(req,res)=>{
//   if(req.body.userpassword !== req.body.conpass){
//   res.send("Error")
//   }
//   else{
//     const reg  =   tripsfile.register(req.body)
//     res.redirect('/login')
//   }
// })


app.get('/user',(req,res)=>{
 
  res.render('home')

})
app.post('/users',(req,res)=>{
 
  if(tripsfile.createplan(req.body.date,req.body.place,req.body.type)){
    res.redirect('user')
  }
  
})

app.get('/trips',(req,res)=>{
 const tripsdata = tripsfile.load()

 res.render('trips',{"data" : tripsdata})
 

})
app.get('/delete/:title',(req,res)=>{
     tripsfile.deltrip(req.params.title)
     res.redirect('/trips')
})


app.listen(port,()=>{console.log("Online")})