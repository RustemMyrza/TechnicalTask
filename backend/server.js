import express, { request } from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3001;
const db = new sqlite3.Database('db/database.db');

app.use(cors({
    origin: 'http://localhost:3000',  // Разрешаем запросы только с этого фронтенда
}));

app.use(bodyParser.json());

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dateTime TEXT,
        author TEXT,
        sum REAL,
        category TEXT,
        comment TEXT
        )
    `);
});

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.delete('/data', (req, res) => {
    db.run(`DELETE FROM transactions`, [], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete data' });
        }
        res.status(200).json({
            message: 'All data deleted successfully',
            changes: this.changes
        });
    });
});


app.get('/data', (req, res) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({
                error: 'Database error'
            });
        }
        return rows.length != 0 ? res.status(200).json(rows) : res.status(200).json({
            message: "There is no data in this table"
        });
    })
})

app.post('/data', (req, res) => {
    const { dateTime, author, sum, category, comment } = req.body;  // Извлекаем данные из тела запроса

    db.run(
        `INSERT INTO transactions 
        (dateTime, author, sum, category, comment) 
        VALUES (?, ?, ?, ?, ?)`,
        [
            dateTime,
            author,
            sum,
            category,
            comment
        ], 
        (err) => {
            if (err) {
                console.error(err.message)
                return res.status(500).json({
                    error: "Check your data or try it later"
                })
            }
            
            return res.status(200).json({
                result: "Data was added successfully"
            })
    })
})

app.listen(port, () => {
    console.log(`Server is running on this ${port}`)
})