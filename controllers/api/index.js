var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

const scopes = [
    'streaming',
];

var spotifyApi = new SpotifyWebApi({
    clientId: '8b46f76b6d5849b2a7c31c071b771355',
    clientSecret: '9c9ea37c51be428ca84da06d35b75f16',
    redirectUri: 'http://localhost:8888/callback'
}),

const app = express();

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.code;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token'), access_token;
      console.log('refresh_token'), refresh_token;

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 5 * 1000);
    
    expexted(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
    

  app.listen(8888, () => 
  console.log('HTTP Server up. Now go to http://localhost:8888/login in your browser.')
    );