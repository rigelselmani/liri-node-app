require("dotenv").config();

var fs=require("fs");

var keys = require("./keys.js");

var command= process.argv[2]

var input= process.argv[3];

function songInfo(input){


var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);


spotify.search({ type: 'track', query: input }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name)
    console.log("Spotify Preview Link: " + data.tracks.items[0].href)
    console.log("Album: " + data.tracks.items[0].album.name)

});
};


var axios = require("axios");

function movieInfo(input) {

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of the Movie: " + response.data.Language);
            console.log("Move Plot: " + response.data.Plot);
            console.log("Actors " + response.data.Actors);
        }
    );
};


// Band Request Function
function bandInfo(input) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";


    axios.get(queryUrl).then(function (response) {
            
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city)
            console.log("Date of Event: " + response.data[0].datetime)
            
        }
    );
}

function doThis(){
fs.readFile("random.txt", "utf8", function(error, data){
    if (error){
        return console.log(error);
    }

    // console.log(data);

    var dataArr = data.split(",");

    if (dataArr[0]==="spotify-this-song"){
        var check = dataArr[1].slice(1,-1);
        songInfo(check);
    }
   
})
}
    

switch (command){
    case "concert-this":
    bandInfo(input);
    break;
    
    case "spotify-this-song":
    songInfo(input);
    break;

    case "movie-this":
    movieInfo(input);
    break;

    case "do-what-it-says":
    doThis();
    break;

}