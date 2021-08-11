const charClass = require('../models/class');

module.exports ={
    getOne,
    getAll
};

async function getOne(req, res){
    const json = await charClass.findOne({index: 'wizard'})
    res.json(json)
}

async function getAll(req, res) {
    try {
      const classes = await charClass.find({});
      res.status(200).json({ classes });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Unable to retrieve class list" + err.message });
    }
  }