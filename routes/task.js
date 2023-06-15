const express = require('express');
const router = express.Router();
const conn = require('../database/db');
const {
    createTable, 
    insertTask, 
    getAllTask, 
    getTask, 
    updateTask, 
    deleteTask
} = require('./controller');

router.route('/').get(getAllTask).post(insertTask);
router.route('/:id').patch(getTask).put(updateTask).delete(deleteTask);

module.exports = router;