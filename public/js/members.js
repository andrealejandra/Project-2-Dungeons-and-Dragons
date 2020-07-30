$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // add references to the buttons on the page... to route things




  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.nickName);
  });
});


//
