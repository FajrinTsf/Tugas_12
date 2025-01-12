const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const TMDB_API_KEY = 'your_tmdb_api_key_here'; // Ganti dengan API Key Anda
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Endpoint untuk mendapatkan daftar film populer
app.get('/movies/popular', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: { api_key: TMDB_API_KEY },
        });
        res.render('popular', { movies: response.data.results });
    } catch (error) {
        res.status(500).send('Error fetching popular movies');
    }
});

// Endpoint untuk mencari film berdasarkan judul
app.get('/movies/search', async (req, res) => {
    const query = req.query.query;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query },
        });
        res.render('search', { movies: response.data.results });
    } catch (error) {
        res.status(500).send('Error searching movies');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
