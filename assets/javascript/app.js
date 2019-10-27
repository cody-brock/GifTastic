var gifsArr = ["happy", "surprised", "shocked", "interested"];

var localGifStorage = {};

function populateImages(array) {
    console.log(array)
    array.forEach(element => {
        $("#gif-field").append($(`<img src="${element.static}">`))
    });
}

function displayGifs() {
    let gifQuery = $(this).text()
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CJRlt8fWwfRQ8V9FigI6bffN4mN5zMgt&q=" + gifQuery + "&limit=10&offset=0&rating=G&lang=en";

    if (localGifStorage[gifQuery]) {
        populateImages(localGifStorage[gifQuery]);
    } else {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //Get info into locally stored object
            let elementArr = [];
            response.data.forEach(element => {
                let tempObj = {};
                tempObj["static"] = element.images.fixed_height_still.url;
                tempObj["animated"] = element.images.fixed_height.url;
                elementArr.push(tempObj);
            });
            localGifStorage[gifQuery] = elementArr;
            populateImages(localGifStorage[gifQuery]);
        })
    }
    // console.log(localGifStorage)
    // console.log(gifQuery)
}

function renderButtons() {
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

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifsArr.push(gif);
    renderButtons();
})

renderButtons();

$(document).on("click", ".gif", displayGifs);