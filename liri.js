require("dotenv").config();

var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require('moment');



var command = process.argv[2];
var search = process.argv[3];


switch(command) {
  case "spotify-this-song": 
  spotifyThisSong(); 
  break;
  
  case "movie-this": 
  movieThis(); 
  break;
      
  case "concert-this": 
  concertThis(); 
  break;

  };

function spotifyThisSong() {
    	if (search == null) {
    		return console.log("Artist: Ace of Base \nSong: 'The Sign' \nAlbum: 'Greatest Hits' \nPreview Link: 'https://open.spotify.com/track/3DYVWvPh3kGwPasp7yjahc'");
    	}
    	params = search;
    	spotify.search({ type: "track", query: params }, function(err, data) {
            if(!err){
    			var songInfo = data.tracks.items;
    			for (var i = 0; i < 10; i++) {
    			 	if (songInfo[i] != undefined) {
    			 		var spotifyResults =
    			 		"Artist: " + songInfo[i].artists[0].name + "\r\n" +
    			 		"Song: " + songInfo[i].name + "\r\n" +
    			 		"Album: " + songInfo[i].album.name + "\r\n" +
    			 		"Preview Link: " + songInfo[i].preview_url + "\r\n" + 
                        "     ----------------------------------       ------------------------------------               " + "\r\n";
    			 		console.log(spotifyResults);
    			 	}
    			}
    		}	else {
    			console.log("Error :"+ err);
    			return;
    			}
    	});
    }

function concertThis() {
if (search == null) {
  return console.log("No band was entered")
}
request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function (error, response, body) {

  if (!error && response.statusCode === 200) {
      var objectBody = JSON.parse(body);
      for (i = 0; i < objectBody.length; i++) {
          console.log("Venue: " + objectBody[i].venue.name);
          console.log("City: " + objectBody[i].venue.city + ", " + objectBody[i].venue.country);
          console.log(moment(objectBody[i].datetime).format("MM/DD/YY"));
      }
  } else {
      console.log(error);
  }
});
}

function movieThis() {
  request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

if (!error && response.statusCode === 200 && search != undefined) {
  
 
  console.log("--------------------------------------");
  console.log("Title: " + JSON.parse(body).Title);
  console.log("Year Released: " + JSON.parse(body).Year);
  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);
  console.log("Country: " + JSON.parse(body).Country);
  console.log("Language: " + JSON.parse(body).Language);
  console.log("Plot Summary: " + JSON.parse(body).Plot);
  console.log("Actors: " + JSON.parse(body).Actors);
} else {
    movieName = "Star wars"
  searchOmdbAPI(search);
}
});
}




