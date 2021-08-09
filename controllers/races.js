const race = require('../models/race');

module.exports ={
    getRace,
    index
};

async function getRace(req, res){
    const json = await race.findOne({index: 'human'})
    res.json(json)
}

async function index(req, res) {
    try {
      const races = await race.find({});
      res.status(200).json({ races });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Unable to retrieve Race list" + err.message });
    }
  }