var gifsArr = ["happy", "surprised", "shocked", "interested"];

var localGifStorage = {};

function populateImages(array, dataName, responseData) {
    for (let i = 0; i < array.length; i++) {
        console.log(responseData);
        let imgRating = responseData[i]['rating']
        let imgWidth = responseData[i]['images']['fixed_height_still']['width'];
        console.log(imgWidth)
        console.log(imgRating);

        $("#gif-field").append($(`<span class="card w-25" style="text-align: center; display: block;">
                                    <img class="startStop static img-thumbnail" src="${array[i].static}" data-name="${dataName}" id=${i} width="${imgWidth}" style="text-align: center; margin-top: 10px">
                                    <div class="card-body">
                                        <div>Rating: ${imgRating.toUpperCase()}</div>
                                    </div>
                                </span>`));
    
    }

}

function animateImageOnClick() {
    let dataName = $(this).attr('data-name');
    let dataId = $(this).attr('id');
    var toMoveOrNotToMove

    if ($(this).attr('class').includes('static')) {
        let newClass = 'animated'
        toMoveOrNotToMove = localGifStorage[dataName][dataId][newClass];
        $(this).toggleClass('static');
    } else {
        let newClass = 'static'
        toMoveOrNotToMove = localGifStorage[dataName][dataId][newClass];
        $(this).toggleClass('static');
    }

    $(this).attr('src', toMoveOrNotToMove);
    
}


function displayGifs() {

    //clears the previously shown gifs
    $("#gif-field").empty();
   
    let gifQuery = $(this).text()
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CJRlt8fWwfRQ8V9FigI6bffN4mN5zMgt&q=" + gifQuery + "&limit=10&offset=0&rating=G&lang=en";
    
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
        populateImages(localGifStorage[gifQuery], gifQuery, response.data);
    })
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

$(document).on("click", ".startStop", animateImageOnClick);
//build function