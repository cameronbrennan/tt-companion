const race = require('../models/race');

module.exports ={
    getOne,
    getAll
};

async function getOne(req, res){
    const json = await race.findOne({index: 'human'})
    res.json(json)
}

async function getAll(req, res) {
    try {
      const races = await race.find({});
      res.status(200).json({ races });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Unable to retrieve Race list" + err.message });
    }
  }