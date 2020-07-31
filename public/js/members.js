$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // add references to the buttons on the page... to route things
  const viewCharacter = $("#view-character");
  const viewCampaign = $("#view-campaign");
  const createCharacter = $("#create-character");
  const createCampaign = $("#create-campaign");


  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.nickName);
  });

  viewCharacter.on("click", (event) => {
    event.preventDefault();
    window.location.replace("/multicharacterview");
  });

  viewCampaign.on("click", (event) => {
    event.preventDefault();
    window.location.replace("/multicampaignview");
  });

  createCharacter.on("click", (event) => {
    event.preventDefault();
    window.location.replace("/createcharacter");
  });

  createCampaign.on("click", (event) => {
    event.preventDefault();
    window.location.replace("/createcampaign");
  });


});


//
