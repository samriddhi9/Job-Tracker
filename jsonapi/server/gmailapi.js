const express = require('express');
const { google } = require('googleapis');

const app = express();

// Set up Gmail API
const gmail = google.gmail({
  version: 'v1',
  auth: 'YOUR_AUTHENTICATION_CLIENT',
});

// API endpoint to search for emails
app.get('/search-email', async (req, res) => {
  const searchTerm = req.query.searchTerm; // Get search term from query params

  // Search for emails using Gmail API
  const response = await gmail.users.messages.list({
    userId: 'me',
    q: searchTerm,
  });

  res.json(response.data);
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
