const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/auth', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error exchanging code for token:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to exchange code for token', details: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});