const {conn} = require('../database/db');

const createTable = async (req, res) => {
    try {
        var q = `CREATE TABLE Task (
            Name varchar(20) not null,
            complete bool not null
        )`

        await conn.query(q, (err, data) => {
            if(err) throw err;

            res.json({data});
        })
    } catch (error) {
        res.json({msg: error});
    }
}

const getAllTask = async (req, res) => {
    try {
        var q = `SELECT * FROM task`;

        const task = await conn.query(q, (err, data) => {
            if(err) throw err;

            res.json({task: data});
        });

    } catch (error) {
        res.json({msg: error});
    }
}

const insertTask = async (req, res) => {
    try {
        var q = `INSERT INTO Task (Name, complete) VALUE ("${req.body.Name}", ${req.body.complete})`;

        await conn.query(q, (err, data) => {
            if(err) throw err;

            res.json({data: data});
        })
    } catch (error) {
        res.json({msg: error});
    }
}


const getTask = async (req, res) => {
    var {id: taskId} = req.params;

    try {
        var q = `SELECT * FROM Task WHERE id=${taskId}`;

        await conn.query(q, (err, data) => {
            if(err) throw err;

            res.json({data});
        })
    } catch (error) {
        res.json({msg: error});
    }
}

const updateTask = async (req, res) => {
    var {id: taskId} = req.params;
    var q = `UPDATE Task SET Name = "${req.body.Name}", complete = ${req.body.complete} WHERE id = ${taskId}`;

    try {
        await conn.query(q, (err, data) => {
            if(err) throw err;

            res.json({data});
        })
    } catch (error) {
        res.json({msg: error});
    }
}

const deleteTask = async (req, res) => {
    var {id: taskId} = req.params;
    try {
        var q = `DELETE FROM Task WHERE id = ${taskId}`;

        await conn.query(q, (err, data) => {
            if(err) throw err;

            res.json({data});
        });
    } catch (error) {
        res.json({msg: error});
    }
}

module.exports = {createTable, insertTask, getAllTask, getTask, updateTask, deleteTask};