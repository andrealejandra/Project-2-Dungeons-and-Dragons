$(document).ready(() => {
    const createForm = $("form.createCharacter");
    const nameInput = $("input#name-input");
    const classInput = $("input#class-input");
    const raceInput = $("input#race-input");
    const subClassInput = $("input#subclass-input");
    const subRaceInput = $("input#subrace-input");
    const briefBioInput = $("input#bio-input");

    createForm.on("submit", (event) => {
        event.preventDefault();
        const newCharacter = {
            name: nameInput.val().trim(),
            class: classInput.val().trim(),
            race: raceInput.val().trim(),
            subClass: subClassInput.val().trim(),
            subRace: subRaceInput.val().trim(),
            briefBio: briefBioInput.val().trim()
        };

        if(!newCharacter.name || !newCharacter.class || !newCharacter.race) {
            return;
        }

        createCharacter(newCharacter.name, newCharacter.class, newCharacter.race,
            newCharacter.subClass, newCharacter.subRace, newCharacter.briefBio);
        nameInput.val("");
        classInput.val("");
        raceInput.val("");
        subClassInput.val("");
        subRaceInput.val("");
        briefBioInput.val("");
    });

    function createCharacter(characterName, characterClass, characterRace, 
        chracterSubclass, characterSubrace, characterBriefbio) {
        $.post("/api/characters", {
            name: characterName,
            class: characterClass,
            race: characterRace,
            subClass: chracterSubclass,
            subRace: characterSubrace,
            briefBio: characterBriefbio
        })
        .then(() => {
            window.location.replace("/characterview");
        })
        .catch((err) => {
            console.log(err);
        });
    }
});


