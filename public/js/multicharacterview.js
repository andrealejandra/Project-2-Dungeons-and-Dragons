let modal = $("#deleteModal");
let backToMenu = $("#backToMenu");

$(document).ready(() => {

    modal = $("#deleteModal");
    const closeBtn = $(".closeBtn")

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
                                <button class="btn btn-warning btn-update" id="${character.id}">Update Character</button>
                                <button type="button" class="btn btn-danger btn-delete" 
                                id="${character.id}" data-toggle="modal" data-target="exampleModal">Delete Character</button>
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

$(backToMenu).on("click",event => {
    event.preventDefault();
    window.location.replace('/members');
});

$(document).on("click", ".btn-update", event => {
    event.preventDefault();
    // console.log(event.target.id);
    window.location.replace(`/characterview/${event.target.id}`);
});

$(document).on("click", ".btn-delete", event => {
    event.preventDefault();
    openModal(event.target.id);
});

$(document).on("click", ".closeBtn", event => {
    event.preventDefault();
    closeModal();
});

$(window).on("click", event => {
    event.preventDefault();
    outsideClick(event);
})

function openModal(id) {
    modal.css("display", "block");
    $("#deleteConfirm").on("click", event => {
        event.preventDefault();
        deleteCharacter(id);
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
function deleteCharacter(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/characters/id/" + id
    }).then(() => {
        window.location.replace("/multicharacterview");
    }).catch(err => {
        console.log(err);
    });
}



