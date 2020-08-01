$(document).ready(() => {
    $.get("/api/campaigns").then(dbCampaigns => {
        console.log(dbCampaigns);
        dbCampaigns.map(campaign => {
            console.log(campaign);
            $.get(`/api/characters/${campaign.id}`).then(dbCharacters => {
                console.log(dbCharacters);
                dbCharacters.map(character => {
                    $("#character-div").append(
                        $(
                        `<div class="tiles">
                            <div type="view-chara" class="tile multiple-desktop ">
                                 <div class="multiple-desktop-text">
                                    Name: ${character.name} <br>
                                    Class: ${character.class} <br>
                                    Race: ${character.race} <br>
                                    Subclass: ${character.subClass} <br>                                        Subrace: ${character.subRace} <br>
                                    Bio: ${character.briefBio} <br>   
                                </div>
                            </div>
                        </div>`)
                    );
                });
            });
        });
    }).catch(err => {
        console.log(err);
    });
});


//on the characterview.html there needs to a div with an id of character-div

        // dbCharacters.map(character => {
        //     $("#character-div").append(
        //         $(
        //         `<div class="tiles">
        //             <div type="view-chara" class="tile multiple-desktop ">
        //                 <div class="multiple-desktop-text">
        //                         Name: ${character.name} <br>
        //                         Class: ${character.class} <br>
        //                         Race: ${character.race} <br>
        //                         Subclass: ${character.subClass} <br>
        //                         Subrace: ${character.subRace} <br>
        //                         Bio: ${character.briefBio} <br>   
        //                 </div>
        //             </div>
        //         </div>`)
        //     );
        // });
