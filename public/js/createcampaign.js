$(document).ready(() => {
    const createForm = $("form.createCampaign");
    const nameInput = $("input#name-input");
    const briefBioInput = $("textarea#bio-input");

    createForm.on("submit", (event) => {
        event.preventDefault();
        const newCampaign = {
            name: nameInput.val().trim(),
            briefBio: briefBioInput.val().trim()
        };

        if (!newCampaign.name || !newCampaign.briefBio) {
            return;
        }

        createCampaign(newCampaign.name, newCampaign.briefBio);
        nameInput.val("");
        briefBioInput.val("");
    });

    function createCampaign(campaignName, campaingBriefBio) {
        $.post("/api/campaigns", {
            name: campaignName,
            campaignSummary: campaingBriefBio
        })
            .then(() => {
                window.location.replace("/campaignView");
            })
            .catch(err => {
                console.log(err);
            });
    }
});