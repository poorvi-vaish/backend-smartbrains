
const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "f2708c28092949a2b9456352cc4a6f90",
});
const handleAPIcall = (req, res) => {
    app.models
      .predict('Clarifai.FACE_DETECT_MODEL', req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch((err) =>{
        res.status(400).json('Unable to call API')
      })
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("Unable to get entries");
    });
}

module.exports ={
  handleImage,
  handleAPIcall
}