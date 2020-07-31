$(document).ready(() => {
    const createForm = $("form.newcampaign");
    const nameInput = $("input#campaign-name");
    const briefBioInput = $("textarea#summary");

    createForm.on("submit", (event) => {
        event.preventDefault();
        const newCampaign = {
            name: nameInput.val().trim(),
            briefBio: briefBioInput.val().trim()
        };

        if (!newCampaign.name || !newCampaign.briefBio) {
            return;
        }

        createCampaign(newCampaign);

        nameInput.val("");
        briefBioInput.val("");
    });

    function createCampaign(newCampaign) {
        $.post("/api/campaigns", {
            name: newCampaign.name,
            campaignSummary: newCampaign.briefBio
        })
            .then(() => {
                window.location.replace("/campaignView");
            })
            .catch(err => {
                console.log(err);
            });
    }
});

