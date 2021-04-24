const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json())

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
    {res.json("success")}
  else {
    res.status(400).json('error signing in')
  }
})

app.post('/register', (req, res)=>{
  const { name, email, password } = req.body;
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
app.listen(3000, ()=>{
  console.log('hey its working!')
})