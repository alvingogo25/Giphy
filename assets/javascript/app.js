var charArray = ["Scott Pilgrim", "Batman", "Captain Jack Sparrow", "Baymax", "Buzz Lightyear"];

// displays buttons
$(document).ready(function(){
  for (var i = 0; i < charArray.length; i++){
    buttons(charArray[i])
  }
});

$("#buttons-here").on("click", ".gif", function(event) {
  event.preventDefault();
  $('#gif-here').empty();
  var character = $(this).attr("data-char");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=xkmLs2xbMTJHxfZ22ruEgWEhL8o2p9dJ&limit=10";

  // AJAX request
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {
    var results = response.data;
    $('#gif-here').append("<p id='instructions'>Click to Animate!")
    for (var i = 0; i < results.length; i++) {
      // check ratings
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var imgDiv = $("<div>");
        // shows rating
        imgDiv.append("<p>Rating: " + results[i].rating);

        var charImage = $("<img>");

        // add attributes to the image
        charImage.attr("src", results[i].images.fixed_height_still.url);
        charImage.attr("gif-state", "still");
        charImage.attr("gif-still", results[i].images.fixed_height_still.url)
        charImage.attr("gif-animate", results[i].images.fixed_height.url);
        charImage.addClass("giph");

        // append image to imgDiv
        imgDiv.append(charImage);

        // append imgDiv to page
        $("#gif-here").append(imgDiv);
      }
    }
  });
});

// click to animate function
$('#gif-here').on('click', '.giph', function() {
  var state = $(this).attr("gif-state");
  if (state == 'still') {
    $(this).attr("src", $(this).attr("gif-animate"));
    $(this).attr("gif-state", "animate")
  }

  if (state == 'animate'){
    $(this).attr("src", $(this).attr("gif-still"));
    $(this).attr("gif-state", "still");
  }
});

// adds new character and button
$('#addNew').click(function() {
  charArray.push($('#new').val());
  buttons($('#new').val());
})

// displays button
function buttons(name) {
  b = $("<button class='gif' data-char='" + name + "'>");
  b.text(name);
  $('#buttons-here').append(b);
}
