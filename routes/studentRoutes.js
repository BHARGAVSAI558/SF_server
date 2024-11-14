const express = require('express');
const { createStudent, getStudents, updateStudent, deleteStudent } = require('../controllers/studentController');
const router = express.Router();
const Student = require('../models/Student');

router.post('/students', async (req, res) => {
  console.log('Received request to add student:', req.body);
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student', error });
  }
});
router.get('/students', getStudents);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router; 