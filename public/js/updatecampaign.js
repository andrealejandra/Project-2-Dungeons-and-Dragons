$(document).ready(() => {
  let address = (window.location.href).split("/");
  let id = address[address.length - 1];
  const createForm = $("form.updateCampaign");
  const nameInput = $("input#campaign-name");
  const summaryInput = $("textarea#summary");

  function update(updateCampaign) {
    $.ajax({
      url: "/api/campaigns",
      type: "PUT",
      data: {
        name: updateCampaign.name,
        campaignSummary: updateCampaign.summary
      },
      success: (data) => {
        window.location.replace("/multicampaignview");
      }
    });
  };



  $.get(`/api/campaigns/id/${id}`).then(campaigns =>
    console.log(campaigns);
  $("#campaign-name").val(campaigns.name);
  $("#summary").val(campaigns.campaignSummary);
  );



createForm.on("submit", event => {
  event.preventDefault();

  const updateCampaign = {
    name: nameInput.val().trim(),
    campaignSummary: summaryInput.val().trim(),
    id: id
  };

  console.log(updateCampaign);

  if (!updateCampaign.name || !updateCampaign.campaignSummary) {
    //find a way to handle this so the user knows "can't have a blank name or summary"
    return;
  }

  update(updateCharacter);


});

})