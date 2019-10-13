var apiKey = "qbCqroiAVMeJhSCIRxAdY9NZMQa6N02T";
var gameNames = [];

function renderButtons () {
    $("#game-buttons").empty();
    for(var i = 0; i < gameNames.length; i++) {
        var gameButtons = $("<button>");
        gameButtons.addClass("game-names");
        gameButtons.attr("data-game", gameNames[i]);
        gameButtons.text(gameNames[i]);
        $("#game-buttons").append(gameButtons);
    }
}

$("#enter-game").on("click", function(event) {
    event.preventDefault();
    var game = $("#game-input").val().trim();
    gameNames.push(game);

    renderButtons();
})

function getAPI() {
    var game = $(this).attr("data-game");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=" + apiKey + "&limit=10";

    $("#game-gifs").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log(queryURL);
        console.log(response);

        var results = response.data;

        for(var i = 0; i < results.length; i++) {
            var gameDiv = $("<div>");
            gameDiv.addClass("col-md-4");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gameImg = $("<img>");
            gameImg.attr("src", results[i].images.fixed_height.url);
            gameDiv.append(p);
            gameDiv.append(gameImg);
            $("#game-gifs").append(gameDiv);
        }
    })

}



$(document).on("click", ".game-names", getAPI);