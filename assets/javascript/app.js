$(".gif").on("click", function() {
  var state = $(this).attr("data-state");
  if (state == 'still') {
    var move = $(this).attr("data-animate");
    $(this).attr("data-state", "animate")
    $(this).attr("src", move);
  }

  if (state == 'animate'){
    var stop = $(this).attr("data-still");
    $(this).attr("data-state", "still");
    $(this).attr("src", stop);
  }
});
