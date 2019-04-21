var games = ["Dark Souls", "Hollow Knight", "Darkest Dungeon", "The Legend of Zelda: Ocarina of Time"]

function displayGameGifs() {

    var gif = $(this).attr("data-name"),
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        gif + "&api_key=jHW5YXf5zGdohyBV8cadbN1RZIhXfQ3i&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("button").on("click", function() {
            var results = response.data

            for (var i = 0; i < results.length; i++) {

            var gameDiv = $("<div>")
                          .append(p)
                          .append(gameImage),
                p = $("<p>").text("Rating: " + results[i].rating),
                gameImage = $("<img>")
                            .attr("data-state", "still")
                            .attr("src", results[i].images.fixed_height_still.url)
                            .attr("data-animate", results[i].images.fixed_height.url)
                            .attr("data-still", results[i].images.fixed_height_still.url)
                            .addClass("gifImage")

            $("#gifContainer").prepend(gameDiv)
            }

            $('.gifImage').on("click", function() {

                var state = $(".gifImage").attr("data-state");

                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
                console.log(this)
            });
        })
    })
}

function generateButtons() {

    $("#btns").empty()

    for (var i = 0; i < games.length; i++) {

        var btn = $("<button>").addClass("game")
                  .attr("data-name", games[i])
                  .text(games[i]);

        $("#btns").append(btn);
    }
}

$("#submitBtn").on("click", function(event) {
    event.preventDefault()

    gif = $("#gif-input").val().trim()

    games.push(gif)
    console.log(games)

    generateButtons()
});

$(document).on("click", ".game", displayGameGifs)

generateButtons()