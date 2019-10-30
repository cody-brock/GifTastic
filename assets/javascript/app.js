var gifsArr = ["happy", "surprised", "shocked", "interested"];

var localGifStorage = {};

function populateImages(array, dataName) {
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        $("#gif-field").append($(`<img class="startStop static" src="${array[i].static}" data-name="${dataName}" id=${i}>`));
    }
    

            //OLD WORKIGN VERSION
    // array.forEach(element => {
    //     $("#gif-field").append($(`<img class="startStop" src="${element.static}">`));
    // });

}

function animateImageOnClick() {
    console.log("regular",this);
    console.log("jquery",$(this));
    console.log(localGifStorage);
    console.log($(this).attr('data-name'));
    console.log($(this).attr('id'));

    let dataName = $(this).attr('data-name');
    console.log("dataName", dataName);
    let dataId = $(this).attr('id');
    console.log("dataId", dataId);



    var currentSource = $(this).attr('src');
    console.log("currentSource", currentSource);

    var staticVsAnimated
    if ($(this).attr('class').includes('static')) {
        let newClass = 'animated'
        staticVsAnimated = localGifStorage[dataName][dataId][newClass];
        $(this).toggleClass('static');
    } else {
        let newClass = 'static'
        staticVsAnimated = localGifStorage[dataName][dataId][newClass];
        $(this).toggleClass('static');
    }

    console.log('staticVsAnimated', staticVsAnimated);
    $(this).attr('src', staticVsAnimated);
    
}


function displayGifs() {
    let gifQuery = $(this).text()
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CJRlt8fWwfRQ8V9FigI6bffN4mN5zMgt&q=" + gifQuery + "&limit=10&offset=0&rating=G&lang=en";
    // let giphyName = $(this).text("data-name")

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
            populateImages(localGifStorage[gifQuery], gifQuery);
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

$(document).on("click", ".startStop", animateImageOnClick);
//build function