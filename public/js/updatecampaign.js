$(document).ready(() => {
  let address = (window.location.href).split("/");
  let id = address[address.length - 1];
  
  let campaigns = [];
  const createForm = $("form.updatecampaign");
  const nameInput = $("input#campaign-name");
  const summaryInput = $("textarea#summary-input");

  function update(updateCampaign) {
      $.ajax({
          url: "/api/campaigns",
          type: "PUT",
          data: {
              name: updateCampaign.name,
              campaignSummary: updateCampaign.campaignSummary,
          },
          success: (data) => {
              window.location.replace("/multicampaignview");
          }
      });
  };


  // const getCampaigns = () => {
  //     $.get("/api/campaigns").then(dbCampaigns => {
  //         dbCampaigns.map(campaign => {
  //             campaigns.push({ id: campaign.id, name: campaign.name });
  //         });
          
  //     });
  // }
  // getCampaigns();

  $.get(`/api/campaigns/id/${id}`).then(character => {
 
      console.log(campaigns);

      let campaignIndex = -1;
      for (let i = 0; i < campaigns.length; i++) {
          if (campaigns[i].id === character.CampaignId) {
              campaignIndex = i;
          }
      }
      console.log(campaignIndex);

      $("#character-name").val(campaigns.name);


      // $("#campaign-input").prepend($(`
      // <option value = ${campaigns[campaignIndex].id}> ${campaigns[campaignIndex].name} </option>
      // `));
      // campaigns.forEach(campaign => {
      //     $("#campaign-input").append($(
      //         `<option value = ${campaign.id}> ${campaign.name} </option>`
      //     ));
      // })

      $("#summary-input").val(campaigns.campaignSummary);
  });

  
  createForm.on("submit", event => {
      event.preventDefault();

      const updateCampaign = {
          name: nameInput.val().trim(),
          campaignSummary: summaryInput.val().trim(),
          id: id
      };

      console.log(updateCampaign);

      if (!updateCampaign.name || !updateCampaign.campaignSummary) {
          return;
      }

      update(updateCampaign);


  });

  

})