const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    res.status(400).json('required fields empty')
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .then(trx.rollback);
  }).catch((err) => {
    res.status(400).json("unable to register");
  });
}

module.exports = {
  handleRegister
}