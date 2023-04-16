const express = require('express');
const app = express();
const request = require('request');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/:username', (req, res) => {
    const options = {
      url: `https://api.github.com/users/${req.params.username}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${process.env.ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github+json'
      }
    };
  
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        res.send(`
          <h1>${data.name}</h1>
          <p>Followers: ${data.followers}</p>
          <p>Repositories: ${data.public_repos}</p>
        `);
      } else {
        res.send('Error retrieving user data');
      }
    });
  });

  app.get('/stats/:username', function(req, res) {
    const options = {
      url: `https://api.github.com/users/${req.params.username}/repos`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${process.env.ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github+json'
      }
    };
  
    request(options, function(err, response, body) {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving user data');
      } else {
        const data = JSON.parse(body);
        res.json(data);
      }
    });
  });

  
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
