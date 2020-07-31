$(document).ready(()=>{
    $.get("/api/campaigns").then(dbCampaigns =>{
        console.log(dbCampaigns);


        dbCampaigns.map(campaigns =>{

        $("#campaigns-div").append(
            $(`<p> 
            Title: ${campaigns.name} <br>
            Summary: ${campaigns.campaignSummary} <br>
            </p>`)
        );
    });


       }).catch(err =>{
         console.log("Why are you here, buddy?");
          console.log(err);
      });     
              
 });

