$(document).ready(()=>{
    $.get("/api/campaigns").then(dbCampaigns =>{
        console.log(dbCampaigns);


        dbCampaigns.map(campaigns =>{

        $("#campaigns-div").append(
            $(`
            <div class="tiles ">
                <div type="view-chara" class="tile multiple-desktop ">
                  <div class="multiple-desktop-text" id= ${campaigns.id}>
                      ${campaigns.name}
                    </a>
                    <br>
                    </div>
                    <button class="btn btn-warning btn-update" id="${campaigns.id}">Update</button>
                </div>
                  </div>
                </div>
            </div>`)
        );
    });


       }).catch(err =>{
         console.log("Why are you here, buddy?");
          console.log(err);
      });     
              
 });

