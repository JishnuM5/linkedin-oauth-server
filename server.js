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
        const { access_token } = response.data;
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const redirectUri = `yourapp://auth?access_token=${access_token}&profile=${encodeURIComponent(JSON.stringify(profileResponse.data))}`;

        console.log(profileResponse);
        res.redirect(redirectUri);
    } catch (error) {
        console.error('Error response from LinkedIn:', error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
