const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb'); // Import MongoClient dari paket mongodb

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connection URL dan nama database
const url = 'mongodb://localhost:27017';
const dbName = 'subscriptionDatabase';

app.post('/subscribe', async (req, res) => {
    const email = req.body.email;

    try {
        // Membuat koneksi ke database
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Mengambil referensi ke basis data
        const db = client.db(dbName);

        // Mengambil koleksi (tabel) yang sesuai
        const collection = db.collection('subscriptions');

        // Menyimpan data ke dalam database
        await collection.insertOne({ email });

        // Menutup koneksi ke database
        client.close();

        // Kirim respons sukses
        res.json({ success: true, message: 'Subscription successful' });
    } catch (error) {
        console.error('Error:', error);
        // Kirim respons gagal jika terjadi kesalahan
        res.status(500).json({ success: false, message: 'Subscription failed' });
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));