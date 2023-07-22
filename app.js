const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Student = require('./models/student')

app.set('view engine','ejs')




const dbURI = "mongodb+srv://***:****@cluster0.sxa4m.mongodb.net/students?retryWrites=true&w=majority";

mongoose.connect(dbURI,{useNewUrlParser:true ,useUnifiedTopology:true})
.then((result)=>{console.log('Connected to DB');
app.listen(3000)

})
.catch((err)=>{err.message})
app.use(express.urlencoded({extends :true}))

app.get('/',(req,res)=>{
    
    Student.find()
    .then((result)=>{res.render('index',{title:'Home',students:result})})
    .catch((err)=>{console.log(err);})
})

app.get('/:id',(req,res)=>{

    const id=req.params.id
    
    Student.findById(id)
    
    .then((result)=>{res.render('details',{title:'details',students:result})})
    .catch((err)=>{console.log(err);})
})

app.get('/delete/:id',(req,res)=>{

    const id=req.params.id
    
    Student.findByIdAndDelete(id)
    
    .then((result)=>{res.redirect('/')})
    .catch((err)=>{console.log(err);})
})

app.post('/create',(req,res)=>{
    const student1=new Student(req.body)
    student1.save()
    .then((result)=>{res.redirect('/')})
    .catch((err)=>{console.log(err);})
})




app.get('/create',(req,res)=>{
    res.render('create',{title:'create'})
})

app.get('/about',(req,res)=>{

    res.render('about',{title:'about'})

})
app.use((req,res,next)=>{

    res.status(404).render('404',{title:'404'})

})

