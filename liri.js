var Keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");

var arg=process.argv.slice(3,process.argv.length);
var op = process.argv[2];
var value = arg.join(" ");


var myTweets= function (){
	var client = new Twitter({
	consumer_key: Keys.twitterKeys.consumer_key,
	consumer_secret: Keys.twitterKeys.consumer_secret,
	access_token_key: Keys.twitterKeys.access_token_key,
	access_token_secret: Keys.twitterKeys.access_token_secret
	});

	client.get('statuses/user_timeline', function(error, tweets, response) {
		if(error) console.log(error);
			for (var i=0;i<Math.min(20, tweets.length);i++) {
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				fs.appendFile("log.txt", "node liri.js my-tweets"+"\r\n", function(err) {
				 if (err)  return console.log(err); });
				fs.appendFile("log.txt", tweets[i].created_at+"\r\n", function(err) {
				 if (err) return console.log(err);  });
				fs.appendFile("log.txt", tweets[i].text+"\r\n", function(err) {
				 if (err) return console.log(err);  });
	 		}
		});
}


var spotifyThisSong= function(value){
	if (value=="") value = "The Sign";

	spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log(err);
    }
    else {
    	console.log(data);
    }
	});
}

var movieThis = function (value){
	if (value=="") value = "Mr. Nobody";
	var url = "http://www.omdbapi.com/?t=" + value+"&y=&plot=short&r=json&apiKey=40e9cece";
	request(url, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	  	 console.log("Title of the movie: "+JSON.parse(body).Title);
   		 console.log("Year the movie came out: "+JSON.parse(body).Released);
   		 console.log("IMDB Rating of the movie: "+ JSON.parse(body).Rated);
   		 console.log("Country where the movie was produced: "+JSON.parse(body).Country);
   		 console.log("Language of the movie: "+ JSON.parse(body).Language);
   		 console.log("Plot of the movie: "+JSON.parse(body).Plot);
   		 console.log("Actors in the movie: "+JSON.parse(body).Actors); 
   		 console.log("URL: "+ JSON.parse(body).Website); 
   		 fs.appendFile("log.txt", "Title of the movie: "+JSON.parse(body).Title+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "Year the movie came out: "+JSON.parse(body).Released+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "IMDB Rating of the movie: "+ JSON.parse(body).Rated+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "Country where the movie was produced: "+JSON.parse(body).Country+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "Language of the movie: "+ JSON.parse(body).Language+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "Language of the movie: "+ JSON.parse(body).Language+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "Plot of the movie: "+JSON.parse(body).Plot+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "Actors in the movie: "+JSON.parse(body).Actors+"\r\n", function(err) {
				 if (err)  return console.log(err); });
   		 fs.appendFile("log.txt", "URL: "+ JSON.parse(body).Website+"\r\n", function(err) {
				 if (err)  return console.log(err); });
	  }
	});
}

var switchSection = function (op, value) {
	switch (op) {
		case "my-tweets":
			myTweets();
		break;

		case "spotify-this-song":
			//spotifyThisSong(value);  //Not working due to access token
			console.log("Not working. Need access token");
		break;

		case "movie-this":
			movieThis(value);
		break;

		case "do-what-it-says":
			fs.readFile("random.txt", "utf8", function(error, data) {
	  		var dataArr = data.split(",");
	  		switchSection (dataArr[0], dataArr[1]);
		});
		
		break;
		default:
			console.log("No command found!");
	}
}

switchSection (op, value);



