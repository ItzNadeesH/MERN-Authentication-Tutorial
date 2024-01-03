const Workout = require('../models/Workout');
const mongoose = require('mongoose');

// get all workout
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'No such workout' });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(400).json({ msg: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (!load) {
    emptyFields.push('load');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ msg: 'Please fill in all the fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'No such workout' });
    }
    const workout = await Workout.findByIdAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ msg: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'No such workout' });
    }
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res.status(400).json({ msg: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
