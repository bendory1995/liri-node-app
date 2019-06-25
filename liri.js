require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');


var name = process.argv[2];
const axios = require('axios');
axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp")
  .then(function(response){
    console.log(response.data[0].venue.name); // ex.: { user: 'Your User'}
    console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ". " + response.data[0].venue.country);
    console.log(moment(response.data[0].datetime).format('LL'));
  });  