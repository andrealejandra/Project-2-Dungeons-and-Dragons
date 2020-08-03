let modal = $("#deleteModal");
const backToMenu = $("#backToMenu");

$(document).ready(() => {

  modal = $("#deleteModal");
  const closeBtn = $(".closeBtn")

  $.get("/api/campaigns").then(dbCampaigns => {

    dbCampaigns.map(campaigns => {

      $("#campaigns-div").append(
        $(`
            <div class="tiles ">
                <div type="view-chara" class="tile multiple-desktop ">
                  <div class="multiple-desktop-text" id= ${campaigns.id}>
                      <h4 class="glow">${campaigns.name}</h4>
                    </a>
                    <br>
                    Summary: ${campaigns.campaignSummary}
                    </div>
                    <button class="btn btn-warning btn-update" id="${campaigns.id}">Update Campaign</button>
                    <button type="button" class="btn btn-danger btn-delete" 
                    id="${campaigns.id}" data-toggle="modal" data-target="exampleModal">Delete Campaign</button>
                </div>
                  </div>
                </div>
            </div>`)
      );
    });


  }).catch(err => {

    console.log(err);
  });

});

$(document).on("click", ".btn-update", event => {
  event.preventDefault();
  window.location.replace(`/campaignview/${event.target.id}`);
});

$(document).on("click", ".btn-delete", event => {
  event.preventDefault();
  openModal(event.target.id);
});

$(document).on("click", ".closeBtn", event => {
  event.preventDefault();
  closeModal();
});

$(backToMenu).on("click",event => {
  event.preventDefault();
  window.location.replace('/members');
});

function openModal(id) {
  modal.css("display", "block");
  $("#deleteConfirm").on("click", event => {
      event.preventDefault();
      deleteCampaign(id);
  });
}

function closeModal() {
  modal.css("display", "none");
}

function outsideClick(event) {
  //console.log(event.target.id);
  if(event.target.id === "deleteModal") {
      modal.css("display", "none");
  }
}

function deleteCampaign(id) {
  $.ajax({
      method: "DELETE",
      url: "/api/campaigns/id/" + id
  }).then(() => {
      window.location.replace("/multicampaignview");
  }).catch(err => {
      console.log(err);
  });
}

