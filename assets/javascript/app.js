var gifsArr = ["happy","surprised", "shocked", "interested"];

function displayGifs() {
    let gifQuery = $(this).text()
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CJRlt8fWwfRQ8V9FigI6bffN4mN5zMgt&q=" + gifQuery + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var newGifDiv = $("<div>");
        response.data.forEach(element => {
            newGifDiv.append($(`<img src="${element.images["480w_still"].url}">`));
        });


        $("#gif-field").append(newGifDiv);
    })
}

function renderButtons () {
    $("#buttons").empty();
    gifsArr.forEach(element => {
        // console.log(element)
        let a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("gif");
        // Adding a data-attribute
        a.attr("data-name", element);
        // Providing the initial button text
        a.text(element);
        // Adding the button to the buttons-view div
        $("#buttons").append(a);
    });
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifsArr.push(gif);
    renderButtons();
})

renderButtons();

$(document).on("click", ".gif", displayGifs);