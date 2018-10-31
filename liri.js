require("dotenv").config();

var keys = require("./key");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var command = process.argv[2];
var search = process.argv[3];

spotify.search({ type: 'track', query: command }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    

  var artists = data.tracks.items[0].album.artists;
  
  

  for (var i=0; i< data.tracks.items.length; i++) {
    // console.log(artists[i].name);
    console.log(data.tracks.items[i].name)
    console.log(data.tracks.items[i].album.artists[0].name)
    console.log(data.tracks.items[i].album.release_date)
  }

 
  });




// var songSearch = "https://api.spotify.com/v1/searchq=name:" + search + "&artist,track";

//








// var bandsInTown = require('')


// if (command == "concert-this") {
// request("https://rest.bandsintwon.com/artist/" + search + "/events?app_id=codingbootcamp") {
//   console.log()
// }
// }

// function bandEventsCall() {
//   bandsInTown.search({type: "artist", query: ""})
// }

