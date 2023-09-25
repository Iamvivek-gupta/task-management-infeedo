const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'task-management',
    password: 'Secure@123',
    port: 5432,
});

app.use(bodyParser.json());

// API to create a task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const query = 'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, description, status];
        const result = await pool.query(query, values);
        res.json({
            message: "task created",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// API to update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const query = 'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *';
        const values = [title, description, status, id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json({
                message: "task updated",
                data: result.rows[0]
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// API to get all tasks (paginated)
app.get('/tasks', async (req, res) => {
    try {
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;
        const query = 'SELECT * FROM tasks ORDER BY created_at DESC LIMIT $1 OFFSET $2';
        const values = [limit, offset];
        const result = await pool.query(query, values);

        res.json({
            message: "all tasks fetched",
            data: result.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// API to get task metrics
app.get('/task-metrics', async (req, res) => {
    try {
        const query = `
            SELECT
                to_char(created_at, 'Month YYYY') AS date,
                COUNT(*) FILTER (WHERE status = 'Open') AS open_tasks,
                COUNT(*) FILTER (WHERE status = 'In Progress') AS inprogress_tasks,
                COUNT(*) FILTER (WHERE status = 'Completed') AS completed_tasks
            FROM tasks
            GROUP BY date
            ORDER BY date;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
