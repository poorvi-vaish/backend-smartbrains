const express = require('express');
const bodyParser = require('body-parser');
const bcrypt  = require ('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors())

const database = {
  users: [
    {
      id:"123",
      name:"john",
      email: 'john@gmail.com',
      password: "cookies",
      entries: 0,
      userId: new Date()
    },
    {
      id:"103",
      name:"sally",
      email: 'sally@gmail.com',
      password: "toffee",
      entries: 0,
      userId: new Date()
    }
  ]
}

app.get('/', (req, res)=>{
  res.send(database.users);
})

app.post('/signin', (req, res) =>{
  
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password
    )
    {res.json(database.users[0])}
  else {
    res.status(400).json('error signing in')
  }
})

app.post('/register', (req, res)=>{
  const { name, email, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});

  database.users.push({
    id:"105",
    name:name,
    email: email,
    password: password,
    entries: 0,
    userId: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      return res.json(user);
    }
  })
  if(!found){
    res.status(404).json("User not found");
  }
})

app.put('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if(!found){
    res.status(404).json("User not found");
  }
})
app.listen(3001, ()=>{
  console.log('hey its working!');
})