const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors()); // Allow all origins
app.use(express.json());

// Initialize OAuth2Client with your actual client ID, client secret, and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  '278258666547-cgbk05tq1et9hpipp1j2fm97o9004u4r.apps.googleusercontent.com',
  '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',
  'http://localhost:5000/auth/callback'
);

// Set up Gmail API
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// Route for initiating OAuth2 flow
app.get('/auth/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.readonly']
    });
    res.redirect(authUrl);
  });
  
  // Callback route for handling OAuth2 callback
  app.post('/auth/callback', (req, res) => {
    const code = req.query.code;
    const request = require('request');

    const TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const CLIENT_ID = '278258666547-cgbk05tq1et9hpipp1j2fm97o9004u4r.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'http://localhost:5000/auth/callback';
    const AUTHORIZATION_CODE = 'authorization_code';
    
    request.post({
      url: TOKEN_URL,
      form: {
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: AUTHORIZATION_CODE
      }
    }, (error, response, body) => {
      if (error) {
        console.error('Error exchanging authorization code for access token:', error);
        return;
      }
      console.log('Response:', body);
      
      const tokenData = JSON.parse(body);
      const accessToken = tokenData.access_token;
  
      // Verify access token (optional)
      // Example: Call OAuth provider's tokeninfo endpoint to verify token validity
  
      // Handle access token (e.g., store it in session, return it to client, etc.)
      res.send(req.user.emails[0].value);
    });

  });
  
  // Search emails containing a particular word for a specific email address
  app.post('/search-emails', async (req, res) => {
    const { email, keyword } = req.body; // Extract email and keyword from the request body
    try {
      const response = await gmail.users.messages.list({
        userId: email,
        q: keyword
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error searching emails:', error.response ? error.response.data.error : error.message);
      res.status(500).json({ error: 'Error searching emails' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
