const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const UNSPLASH_API_KEY = 'APyz3-z80ddT_F2zulk8pHTejTQKqOkqknBw51UmTnE';
app.use(cors())



app.get('/random_photo', async (req, res) => {
  try {
    const city = req.query.city || ''; // Get the city query parameter
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: UNSPLASH_API_KEY,
        query: city, // Use the city as the query parameter for photo search
      },
    });
    // Return a random photo from the search results
    const randomIndex = Math.floor(Math.random() * response.data.results.length);
    res.json(response.data.results[randomIndex]);
  } catch (error) {
    console.error('Error fetching random photo:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});