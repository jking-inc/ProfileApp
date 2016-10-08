// Problem: We need to find a simple way to look at a users badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

var http = require("https");


//Print out message
function printMessage(username, badgeCount, points) {
   var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
    console.log(message);
}

function get(username){
// Pring out error messages
    function printError(error){
            console.error(error.message);
    };

    //Connect to API URL (http://teamtreehouse.com/username.json)
    var request = http.get("https://teamtreehouse.com/" + username + ".json", function(response){
        var body = "";
        // read the data
        response.on('data', function (chunk) {
            body += chunk;    
        });
        response.on('end', function(){
            if(response.statusCode === 200) {
                try {
                // Parse the data
               var profile = JSON.parse(body);
                 // Print the data
                printMessage(username, profile.badges.length, profile.points.JavaScript);
                }catch(error) {
                    //parse error
                    printError(error);
                }
            } else {
                // Status code error
                printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
            }
        });
    });
        
        

    request.on("error", printError);
}

module.exports.get = get;