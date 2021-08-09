const charClass = require('../models/class');

module.exports ={
    getClass,
    index
};

async function getClass(req, res){
    const json = await charClass.findOne({index: 'wizard'})
    res.json(json)
}

async function index(req, res) {
    try {
      const classes = await charClass.find({});
      res.status(200).json({ classes });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Unable to retrieve class list" + err.message });
    }
  }