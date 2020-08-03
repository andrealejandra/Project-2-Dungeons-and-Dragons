const viewAllCampaigns = $("#viewAllCampaigns");

$(document).ready(() => {
  let address = (window.location.href).split("/");
    let id = address[address.length - 1];

    const updateForm = $("form.updatecampaign");
    const campaignName = $("#campaign-name");
    const summary = $("#summary");

    function update(updateCampaign) {
      console.log(updateCampaign);
      $.ajax({
        url: "/api/campaigns",
        type: "PUT",
        data: {
          name: updateCampaign.name,
          campaignSummary: updateCampaign.summary,
          id: id
        },
        success: (data) => {
          window.location.replace("/multicampaignview");
        }
      });
    };

    $.get(`/api/campaigns/id/${id}`).then(campaign => {
      campaignName.val(campaign.name);
      summary.val(campaign.campaignSummary);
    });

    updateForm.on("submit", event => {
      event.preventDefault();

      const updateCampaign = {
        name: campaignName.val().trim(),
        summary: summary.val().trim()
      };

      if(!updateCampaign.name || !updateCampaign.summary) {
        return;
      }

      update(updateCampaign);

    })
})

viewAllCampaigns.on("click", event => {
  event.preventDefault();
  window.location.replace('/multicampaignview')
})



// var db = require("../models");

// module.exports = function(app) {

  //route to get and display one campaign
  // $.get("/api/user_data").then(function(data) {
  //   $(".member-name").text(data.nickName);
  // });

  // viewCharacter.on("click", (event) => {
  //   event.preventDefault();
  //   window.location.replace("/updatecampaign");
  // });

// $(document).ready(() => {
//     $("#one-camp").append
//     $.get("/api/characters").then(dbCharacters => {
//         let characterString = dbCharacters.map(character => {
//             `
//             <p>
//                 Campaign: ${character.name},
//                 Summary: ${}
            
//             </p>
//             `
//         }).join("");
//         $("#character-div").html(characterString);
//     });
// })}
