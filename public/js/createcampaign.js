const backToMenu=$("#backToMenu");$(document).ready(()=>{function a(a){$.post("/api/campaigns",{name:a.name,campaignSummary:a.briefBio}).then(()=>{window.location.replace("/multicampaignview")}).catch(a=>{console.log(a)})}const b=$("form.newcampaign"),c=$("input#campaign-name"),d=$("textarea#summary");b.on("submit",b=>{b.preventDefault();const e={name:c.val().trim(),briefBio:d.val().trim()};e.name&&e.briefBio&&(a(e),c.val(""),d.val(""))})}),$(backToMenu).on("click",a=>{a.preventDefault(),window.location.replace("/members")});
