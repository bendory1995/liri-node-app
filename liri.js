//dotenv package
require("dotenv").config();
//safe key
var keys = require("./keys.js");
//spotify api / package
var Spotify = require('node-spotify-api');
//creating an instance of Spotify object with the keys.
var spotify = new Spotify(keys.spotify);

//moment package
var moment = require('moment');
// fs package
var fs = require('fs');
// taking in the command 
var command = process.argv[2];
//var name = process.argv[3];
var nameArr = [];
//name variable.
var name = "";
// axios package
const axios = require('axios');
// if user inputs concert-this
if (command == "concert-this") {
    //join the words into one
    for (var i = 3; i < process.argv.length; i++){
        nameArr.push(process.argv[i]);
    }
    
    name = nameArr.join('%20');
    //using axios to make a request to bandsintown
    axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data[0].venue.name); // ex.: { user: 'Your User'}
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ". " + response.data[0].venue.country);
            console.log(moment(response.data[0].datetime).format('LL'));
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
// if user inputs spotify-this-song
else if (command == "spotify-this-song") {
        //join the words into one
    for (var i = 3; i < process.argv.length; i++) {
        nameArr.push(process.argv[i]);
    }

    name = nameArr.join(' ');
    //spotify search
    spotify.search({ type: 'track', query: name }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });
}
// if user inputs movie-this
else if (command == "movie-this") {
        //join the words into one
    for (var i = 3; i < process.argv.length; i++) {
        nameArr.push(process.argv[i]);
    }

    name = nameArr.join(' ');

    //using axios to make a request
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + name)
        .then(function (response) {
            console.log("Movie name: " + name);
            console.log("Movie Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
// if user inputs do-what-it-says
else if (command == "do-what-it-says") {
    //read from random.txt
    fs.readFile('./random.txt', 'utf8', function(err, data) {
        if (err) throw err;
        name = data.split(",");
        //spotify search
        spotify.search({ type: 'track', query: name[1] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
    
            console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + name[1]);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
        });
      });

}
