// var db = require("../models");

// module.exports = function(app) {

//   //route to get and display one campaign
  // $.get("/api/user_data").then(function(data) {
  //   $(".member-name").text(data.nickName);
  // });

//   viewCharacter.on("click", (event) => {
//     event.preventDefault();
//     window.location.replace("/updatecampaign");
//   });


// })}


$(document).ready(() => {
  $("#one-camp").prepend
  $.get("/api/campaigns").then(dbCampaigns => {
     dbCampaigns.map(campaigns => {
          `
          <!-- <div class="edit">
          <form class="newcampaign">
              <div class="form-group">
                  <label for="campaignName">${campaigns.name}</label>
                  <input type="name" class="form-control" id="campaign-name" placeholder="Update Campaign">
              </div>
              <div class="form-group">
                  <label for="campaignSummary">Summary</label>
                  <textarea class="form-control" id="summary" cols="30" rows="10"
                      placeholder= ${campaigns.campaignSummary}></textarea>
              </div>
              <button type="submit" class="btn">Save</button>
          </form>
  
      </div>
          `
      })

  }).catch(err => {
    console.log("Well then, why are ya here?");
    console.log(err);
  });
});
