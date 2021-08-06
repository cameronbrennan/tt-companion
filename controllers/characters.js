const Character = require("../models/character");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  create,
  index,
};

function create(req, res) {
  console.log(req.file)
  try {
    const filePath = `${uuidv4()}/${req.file.originalname}`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
    };
    s3.upload(params, async function (err, data) {
      if (err) {
        console.log(err);
        res.json({ data: err });
      }
      console.log(data, ' this data')
      const character = await Character.create({
        name: req.body.name,
        race: req.body.race.toLowerCase(),
        class: req.body.class.toLowerCase(),
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        charBio: req.body.charBio,
        user: req.user,
        photoUrl: data.Location,
      });

      const populatedCharacter = await character.populate("user").execPopulate();
      res.status(201).json({ character: populatedCharacter });
    });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
}

async function index(req, res) {
  try {
    const characters = await Character.find({}).populate("user").exec();
    res.status(200).json({ characters });
  } catch (err) {}
}
