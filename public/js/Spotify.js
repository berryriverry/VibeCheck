const SpotifyWebApi = require('spotify-web-api-node');
const router = require('express').Router();
const { User, Preferences } = require('../../models');
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: "/callback"
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  var stateKey = 'spotify_auth_state';

const app = express()
app.use(cors())
    .use(cookieParser());

var state = generateRandomString(16);
res.cookie(stateKey, state);

// your application requests authorization
var scope = 'user-read-private user-read-email';
res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));


const spotAuth = function () {
    app.get('/callback', function (req, res) {
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(stateKey);
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;
            
                    var options = {
                      url: 'https://api.spotify.com/v1/me',
                      headers: { 'Authorization': 'Bearer ' + access_token },
                      json: true
                    };
            
                    // use the access token to access the Spotify Web API
                    request.get(options, function(error, response, body) {
                      console.log(body);
                    });
            
                    // we can also pass the token to the browser to make requests from there
                    res.redirect('/#' +
                      querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                      }));
                  } else {
                    res.redirect('/#' +
                      querystring.stringify({
                        error: 'invalid_token'
                      }));
                  }
                });
              }
            });

        }
        
        const findTrack = function (title, title2, artist, artist2) {
            if (title && title2)
            if (title || title2) {
                if (!title2) {
                    spotifyApi.searchTracks(`track:${title}artist:${artist}`)
                        .then(function (data) {
                            console.log(data)
                        })

                }
                else if (!title) {
                    spotifyApi.searchTracks(`track:${title2}artist:${artist2}`)
                        .then(function (data) {
                            console.log(data)
                        })
                };
            };
        };

        const makeList = function (mood, seed1, seed2) {
            spotifyApi.createPlaylist(`${mood}`, { 'description': 'My description', 'public': true })
                .then(function (data) {
                    console.log('Created playlist!');
                }, function (err) {
                    console.log('Something went wrong!', err);
                });
                if(seed1 && seed2)
                spotifyApi.getRecommendations({
                    min_energy: 0.4,
                    seed_tracks: [`${seed1}`, `${seed2}`],
                    min_popularity: 50
                  })
                .then(function(data) {
                  let recommendations = data.body;
                  console.log(recommendations);
                }, function(err) {
                  console.log("Something went wrong!", err);
                });
        }
    