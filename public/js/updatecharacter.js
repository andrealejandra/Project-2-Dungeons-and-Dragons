$(document).ready(() => {
    let address = (window.location.href).split("/");
    let id = address[address.length - 1];
    
    let campaigns = [];
    const createForm = $("form.updatecharacter");
    const nameInput = $("input#character-name");
    const classSelection = $("select#class-input");
    const raceSelection = $("select#race-input");
    const subClassSelection = $("select#subclass-input");
    const subRaceSelection = $("select#subrace-input");
    const campaignSelection = $("select#campaign-input");
    const briefBioInput = $("textarea#bio-input");

    function update(updateCharacter) {
        $.ajax({
            url: "/api/characters",
            type: "PUT",
            data: {
                name: updateCharacter.name,
                class: updateCharacter.class,
                race: updateCharacter.race,
                subClass: updateCharacter.subClass,
                subRace: updateCharacter.subRace,
                briefBio: updateCharacter.briefBio,
                campaign: updateCharacter.campaign,
                id: updateCharacter.id
            },
            success: (data) => {
                window.location.replace("/multicharacterview");
            }
        });
    };

    const getClasses = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/classes",
            method: "GET"
        }).then(response => {
            let classNames = response.results.map(object => object.name);

            for (let i = 0; i < classNames.length; i++) {
                $("#class-input").append($(`
                <option id=${classNames[i]} value = ${classNames[i]}> ${classNames[i]} </option>
                `));
            };
        }).catch(err => {
            throw err;
        })
    };
    const getRaces = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/races",
            method: "GET"
        }).then(response => {
            let raceNames = response.results.map(object => object.name);

            for (let i = 0; i < raceNames.length; i++) {
                $("#race-input").append($(`
                <option value = ${raceNames[i]}> ${raceNames[i]} </option>
                `));
            };
        }).catch(err => {
            throw err;
        })
    };
    // get all the subclasses from the Dungeons and Dragons api
    const getSubClasses = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/subclasses",
            method: "GET"
        }).then(response => {
            let subclassNames = response.results.map(object => object.name);

            for (let i = 0; i < subclassNames.length; i++) {
                $("#subclass-input").prepend($(`
                <option value = ${subclassNames[i]}> ${subclassNames[i]} </option>
                `));
            };
            $("#subrace-input").append($(`
            <option value = "null">Null</option>
            `));
        }).catch(err => {
            throw err;
        })
    };
    // get all the subraces from the Dungeons and Dragons api
    const getSubRaces = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/subraces",
            method: "GET"
        }).then(response => {
            let subraceNames = response.results.map(object => object.name);
            for (let i = 0; i < subraceNames.length; i++) {
                $("#subrace-input").append($(`
                <option value = ${subraceNames[i]}> ${subraceNames[i]} </option>
                `));
            };
            $("#subrace-input").append($(`
            <option value = "null">Null</option>
            `));
        }).catch(err => {
            throw err;
        })
    };

    const getCampaigns = () => {
        $.get("/api/campaigns").then(dbCampaigns => {
            dbCampaigns.map(campaign => {
                campaigns.push({ id: campaign.id, name: campaign.name });
            });
            
        });
    }
    getClasses();
    getRaces();
    getSubClasses();
    getSubRaces();
    getCampaigns();

    $.get(`/api/characters/id/${id}`).then(character => {
        console.log(character.CampaignId);
        console.log(campaigns);

        let campaignIndex = -1;
        for (let i = 0; i < campaigns.length; i++) {
            if (campaigns[i].id === character.CampaignId) {
                campaignIndex = i;
            }
        }
        console.log(campaignIndex);

        $("#character-name").val(character.name);

        $("#class-input").prepend($(`
        <option value = ${character.class}> ${character.class} </option>
        `));

        $("#race-input").prepend($(`
        <option value = ${character.race}> ${character.race} </option>
        `));

        $("#subclass-input").prepend($(`
        <option value = ${character.subClass}> ${character.subClass} </option>
        `));

        $("#subrace-input").prepend($(`
        <option value = ${character.subRace}> ${character.subRace} </option>
        `));

        $("#campaign-input").prepend($(`
        <option value = ${campaigns[campaignIndex].id}> ${campaigns[campaignIndex].name} </option>
        `));
        campaigns.forEach(campaign => {
            $("#campaign-input").append($(
                `<option value = ${campaign.id}> ${campaign.name} </option>`
            ));
        })

        $("#bio-input").val(character.briefBio);
    });

    
    createForm.on("submit", event => {
        event.preventDefault();

        const updateCharacter = {
            name: nameInput.val().trim(),
            class: classSelection.val().trim(),
            race: raceSelection.val().trim(),
            subClass: subClassSelection.val().trim(),
            subRace: subRaceSelection.val().trim(),
            campaign: campaignSelection.val(),
            briefBio: briefBioInput.val().trim(),
            id: id
        };

        console.log(updateCharacter);

        if (!updateCharacter.name || !updateCharacter.class || !updateCharacter.race) {
            //find a way to handle this so the user knows "can't have a blank name... or blank class..."
            return;
        }

        update(updateCharacter);


    });

    

})