const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const port = 8000; 


app.use(cors());


app.get('/api/quiz', async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz data' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});