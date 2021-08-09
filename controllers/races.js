const race = require('../models/Race');

module.exports ={
    getRace
};

async function getRace(req, res){
    const json = await race.findOne({index: 'human'})
    res.json(json)
}