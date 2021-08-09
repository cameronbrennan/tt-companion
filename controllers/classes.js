const charClass = require('../models/Class');

module.exports ={
    getClass
};

async function getClass(req, res){
    const json = await charClass.findOne({index: 'wizard'})
    res.json(json)
}