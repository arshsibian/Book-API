const express = require('express');
const db = require('./database');

const app = express();
app.use(express.json());

// GET /book - return all books
app.get('/book', (req, res) => {
    db.all('SELECT * FROM book', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET /book/:id - return the book with given id
app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM book WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// POST /book - Add a book
app.post('/book', (req, res) => {
    const { name, author, year } = req.body;
    db.run('INSERT INTO book (name, author, year) VALUES (?, ?, ?)',
        [name, author, year],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        });
});

// PUT /book/:id - Modify a book with given id
app.put('/book/:id', (req, res) => {
    const { name, author, year } = req.body;
    const id = req.params.id;
    db.run('UPDATE book SET name = ?, author = ?, year = ? WHERE id = ?',
        [name, author, year, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ changes: this.changes });
        });
});

// DELETE /book/:id - Delete a book with given id
app.delete('/book/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM book WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});