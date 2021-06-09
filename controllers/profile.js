const handleProfile = (req, res, db)=> {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        return res.json(user);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => res.status(404).json("User not found"));
}

module.exports = {
  handleProfile
}