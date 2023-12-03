const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Menghubungkan ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: 'admin', // Ganti dengan password MySQL Anda
    database: 'hotel' // Ganti dengan nama database Anda
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Menangani formulir pemesanan
app.post('/saveData', express.urlencoded({ extended: true }), (req, res) => {
    const { checkindate, checkoutdate, roomtype, guests } = req.body;

    const sql = 'INSERT INTO tbl_booking (checkindate, checkoutdate, roomtype, guests) VALUES (?, ?, ?, ?)';
    db.query(sql, [checkindate, checkoutdate, roomtype, guests], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});