// var db = require("../models");

// module.exports = function(app) {

//   //route to get and display one campaign
//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.nickName);
//   });

//   viewCharacter.on("click", (event) => {
//     event.preventDefault();
//     window.location.replace("/updatecampaign");
//   });


// })}


$(document).ready(() => {
  $("#one-camp").append
  $.get("/api/campaigns").then(dbCampaigns => {
      // let campaignString =
       dbCampaigns.map(campaigns => {
          `
          <p>
              Campaign: ${campaigns.name},
              Summary: ${campaigns.campaignSummary}
          
          </p>
          `
      });
      // .join("");
      // $("#character-div").html(camapignString);
  }).catch(err => {
    console.log("Well then, why are ya here?");
    console.log(err);
  });
});
