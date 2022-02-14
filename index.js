const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')

const mongoDB = 'mongodb://localhost:27017/emp_api'
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection;
db.on('error',  console.error.bind(console, 'MONGODB error'));

const empSchema = new mongoose.Schema({
  firstName: String, 
  age: Number
})

const Emp = mongoose.model('Emp', empSchema)

const app = express();

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());
const PORT = 8080;

const employee =[
    { 
        firstName: "John", 
        age: 27  
      }, 
      { 
        firstName: "James", 
        age: 32 
      }, 
      { 
        firstName: "Robert", 
        age: 45 
      } 
]

app.get("/", async (req, res) => {
 await Emp.deleteMany();
 await Emp.insertMany(employee);
   Emp.find((err, emps)=>{

     res.json(emps)
   }) 
})


app.get("/emp/:firstName",async (req, res) => {
 const e = await Emp.findOne({firstName: req.params.firstName})
  console.log("employee" ,e );
  res.json(e)
})

app.post("/emp", (req, res) => {
  const emp = new Emp({
    firstName:req.body.firstName,
    age:req.body.age 

  })

  emp.save((err)=>{
    
    res.json(emp)
  })



  //res.json({message:"ok"})
})

app.put("/emp/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.json({message:`updated `})
  console.log(employee);
})

app.delete("/emp/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.json({message:"deleted"})
  console.log(employee);
})


app.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`);
});