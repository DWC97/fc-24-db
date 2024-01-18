const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/player-image', async (req, res) => {
    const imageUrl = req.query.url;
  
    try {
      const response = await fetch(imageUrl);
      const imageData = await response.buffer();
      res.set('Content-Type', response.headers.get('content-type'));
      res.send(imageData);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });