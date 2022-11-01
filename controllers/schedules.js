const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db('cse341')
    .collection('schedule')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid schedule id to find a schedule .');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('cse341')
    .collection('schedule')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createSchedule = async (req, res) => {
  const scheduleInfo = {
    date: req.body.date,
    opponent: req.body.opponent,
    location: req.body.location
  };
  const response = await mongodb
    .getDb()
    .db('cse341')
    .collection('schedule')
    .insertOne(scheduleInfo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the schedule.');
  }
};

const updateSchedule = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid schedule id to update the schedule.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const scheduleInfo = {
    date: req.body.date,
    opponent: req.body.opponent,
    location: req.body.location
  };
  const response = await mongodb
    .getDb()
    .db('cse341')
    .collection('schedule')
    .replaceOne({ _id: userId }, scheduleInfo);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the schedule.');
  }
};

const deleteSchedule = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid schedule id to delete a schedule.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('cse341')
    .collection('schedule')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the schedule.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createSchedule,
  updateSchedule,
  deleteSchedule
};
