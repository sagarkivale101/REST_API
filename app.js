const express = require('express');
const bodyparser = require('body-parser');
const connectDB = require('./db');
const mongoose = require('mongoose')

// const mongoDB = 'mongodb://localhost:27017/emp_api'
// mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true})

// const db = mongoose.connection;
// db.on('error',  console.error.bind(console, 'MONGODB error'));
connectDB();
const empSchema = new mongoose.Schema({
  _id: Number,
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
      _id: 1,
        firstName: "John", 
        age: 27  
      }, 
      { _id: 2,
        firstName: "James", 
        age: 32 
      }, 
      { 
        _id: 3,
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

  //  Emp.find((err, emps)=>{
  //    console.log(emps[0].Eid);
  //    res.json(emps)
  //  }).sort({Eid:-1}).limit(1)

})


 function max(){

  let a=0;
  Emp.find((err, emps)=>{
   console.log(emps[0].Eid);
    a = emps[0].Eid; 

  }).sort({id:-1}).limit(1)

  return a;
}




app.get("/emp/:Eid",async (req, res) => {
 const e = await Emp.findOne({_id: req.params.Eid})
  console.log("employee" ,e );
  res.json(e)
})


app.post("/emp", (req, res) => {
 

  const emp = new Emp({
    _id:req.body._id,
    firstName:req.body.firstName,
    age:req.body.age 

  })

  emp.save((err)=>{
    res.json(emp)
  })

})



app.put("/emp/:id", (req, res) => {
  
Emp.findByIdAndUpdate( req.params.id , {$set: {'age': req.body.age}}, {new: true},
function(err,user){
  if(err){
      res.json({error :err}) ; 
  } else{
      res.send(user) ; 
  }
})

})


app.delete("/emp/:id", (req, res) => {
  
  Emp.findByIdAndDelete( req.params.id, 
  function(err,user){
    if(err){
        res.json({error :err}) ; 
    } else{
        res.send(user) ; 
    }
  })
})


app.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`);
});