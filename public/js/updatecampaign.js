var db = require("../models");

module.exports = function(app) {

  //route to get and display one campaign
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.nickName);
  });

  viewCharacter.on("click", (event) => {
    event.preventDefault();
    window.location.replace("/updatecampaign");
  });

// $(document).ready(() => {
//     $("#one-camp").append
//     $.get("/api/characters").then(dbCharacters => {
//         let characterString = dbCharacters.map(character => {
//             `
//             <p>
//                 Campaign: ${character.name},
//                 Summary: ${}
            
//             </p>
//             `
//         }).join("");
//         $("#character-div").html(characterString);
//     });
// })}
