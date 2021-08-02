const classes = require('../models/classes');

module.exports ={
    getClass
};

async function getClass(req, res){
    const json = await classes.findOne({index: 'wizard'})
    res.json(json)
}