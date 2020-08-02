$(document).ready(() => {
    $.get("/api/characters").then(dbCharacters => {
        console.log(dbCharacters);

        dbCharacters.map(character => {
            $("#character-div").append(
                $(`<p> 
                Name: ${character.name} <br>
                Class: ${character.class} <br>
                Race: ${character.race} <br>
                Subclass: ${character.subClass} <br>
                Subrace: ${character.subRace} <br>
                Bio: ${character.briefBio} <br>
                </p>`)
            );
        });
                
    }).catch(err => {
        console.log("didn't get here");
        console.log(err);
    });
});


//on the characterview.html there needs to a div with an id of character-div
