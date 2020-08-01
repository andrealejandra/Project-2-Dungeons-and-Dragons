$(document).ready(() => {
    $.get("/api/campaigns").then(dbCampaigns => {
        dbCampaigns.map(campaign => {
            $.get(`/api/characters/${campaign.id}`).then(dbCharacters => {
                dbCharacters.map(character => {
                    $("#character-div").append(
                        $(
                        `<div class="tiles">
                            <div type="view-chara" class="tile multiple-desktop ">
                                <div class="multiple-desktop-text" id=${character.id}>
                                    Name: ${character.name} <br>
                                    Class: ${character.class} <br>
                                    Race: ${character.race} <br>
                                    Subclass: ${character.subClass} <br>                                        
                                    Subrace: ${character.subRace} <br>
                                    Bio: ${character.briefBio} <br>   
                                </div>
                                <button class="btn btn-warning btn-update" id="${character.id}">Update</button>
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

$(document).on("click", ".btn-update", event => {
    event.preventDefault();
    // console.log(event.target.id);
    window.location.replace(`/characterview/${event.target.id}`);

});

