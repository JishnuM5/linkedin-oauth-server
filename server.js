const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/auth', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
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
        console.error('Error response from LinkedIn:', error.response.data);
        res.status(500).json({ error: 'We havin little problem, yeah: ' + error + ' Redirect: ' + process.env.REDIRECT_URI + ' ID: ' + process.env.CLIENT_ID + ' Secret: ' + process.env.CLIENT_SECRET });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});