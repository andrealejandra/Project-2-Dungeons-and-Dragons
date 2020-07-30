$(document).ready(() => {
    $.get("/api/characters").then(dbCharacters => {
        let characterString = dbCharacters.map(character => {
            `
            <p>
                Name: ${character.name},
                class: ${character.class},
                race: ${chracter.race},
                subclass: ${character.subClass},
                subrace: ${character.subRace},
                biography: ${character.briefBio}
            
            </p>
            `
        }).join("");
        $("#character-div").html(characterString);
    });
});


//on the characterview.html there needs to a div with an id of character-div