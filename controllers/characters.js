const mongoose = require('mongoose');
const Character = require("../models/character");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  create,
  index,
  detail,
};

async function createDBCharacter(req, photoUrl) {
  const character = await Character.create({
    name: req.body.name,
    race: "6110ceae73789937de0c5ff8", //req.body.race.toLowerCase(),
    class: "6110cea9da84dc7de4e69be8", //req.body.class.toLowerCase(),
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intelligence: req.body.intelligence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma,
    charBio: req.body.charBio,
    user: req.user,
    photoUrl: photoUrl,
  });

  const populatedCharacter = await character.populate("user").execPopulate();
  return populatedCharacter;
}

function create(req, res) {
  if (req.file) {
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
        const populatedCharacter = createDBCharacter(req, data.Location);
        res.status(201).json({ character: populatedCharacter });
      });
    } catch (err) {
      console.log(err);
      res.json({ err });
    }
  } else {
    const populatedCharacter = createDBCharacter(req, undefined);
    res.status(201).json({character: populatedCharacter});
  }
}

async function index(req, res) {
  try {
    const characters = await Character.find({}).populate("user").exec();
    res.status(200).json({ characters });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to retrieve character list" + err.message });
  }
}

async function detail(req, res) {
  try {
    const character = await Character.findOne({ _id: req.params.id })
      .populate("user")
      .populate("race")
      .populate("class")
      .exec();
    console.log(character, "<- character");
    if (!character) {
      res.status(404).json({ message: "character not found" });
    } else {
      res.status(200).json({ character: character });
    }
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
}
