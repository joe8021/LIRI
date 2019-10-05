require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require('node-spotify-api');

var spotifyID = keys.spotify.id;
var spotifySecret = keys.spotify.secret;
var spotify = new Spotify(keys.spotify);
var bands = keys.bands;
//console.log(bands.id);

var action = process.argv[2];
var value = process.argv[3];

var spotifyInit = new Spotify(keys.spotify);

switch (action) {
    case "concert-this":
        concert()
        break;

    case "spotify-this-song":
        spotifySong()
        break;

    case "movie-this":
        movie()
        break;

    case "do-what-it-says":
        doIt()
        break;
}

function concert(){
    var url = `https://rest.bandsintown.com/artists/${value}/events?app_id=${bands.id}`;
    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    axios.get(url)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
            //console.log("THIS IS THE BAND KEY:" +  bands);
        })
        .catch(function (error) {
            if (error.response) {
               console.log(error.response)
            }
            console.log(error.config);
        });
};

function spotifySong(){
    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        console.log("Artist: " + data.tracks.items[1].album.name);
        console.log("Name: " + data.tracks.items[0].name);
        console.log("Link " + data.tracks.items[1].album.external_urls.spotify);
        console.log("Album " + data.tracks.items[1].album.album_type);

        // console.log(data);
    })

};

//spotifySong();

function movie(){

}

function doIt(){

}