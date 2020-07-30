$(document).ready(() => {
    const racesURL = "https://www.dnd5eapi.co/api/races";
    const subClassesURL = "https://www.dnd5eapi.co/api/subclasses";
    const subRacesURL = "https://www.dnd5eapi.co/api/subraces";

    const classForm = $("form#classTest");
    const raceForm = $("form#racetest");
    const subRaceForm = $("form#subRacetest");
    const subClassForm = $("form#subClasstest");


    const classInput= $("select#class-input");
    const raceInput = $("select#race-input");
    const subRaceInput = $("select#subRace-input");
    const subClassInput = $("select#subClass-input");


    classForm.on("submit", event =>{
        event.preventDefault();
        console.log(classInput.val());
    });

    raceForm.on("submit", event =>{
        event.preventDefault();
        console.log(raceInput.val());
    });

    subRaceForm.on("submit", event =>{
        event.preventDefault();
        console.log(subRaceInput.val());
    });

    subClassForm.on("submit", event=>{
        event.preventDefault();
        console.log(subClassInput.val());
    })

    // const select = [];

    var classesURL = "https://www.dnd5eapi.co/api/classes";

    //Call API
    function callClassesAPI() {
        $.ajax({
            url: classesURL,
            method: "GET"
        }).then(function (response) {
            var results = response.results.map(characterObject => characterObject.name);
            console.log(results);

            for(let i= 0; i < results.length; i++){
                $("#class-input").append($(`<option value = ${results[i]}> ${results[i]} </option>`));
            }
        })
    }
    callClassesAPI();
    // });


function callRacesAPI() {
    $.ajax({
        url: racesURL,
        method: "GET"
    }).then(function (response) {
        var results = response.results.map(characterObject => characterObject.name);
        console.log(results);

        for(let i= 0; i < results.length; i++){
            $("#race-input").append($(`<option value = ${results[i]}> ${results[i]} </option>`));
        }
    })
    }
    callRacesAPI();




    function callSubRacesAPI() {
        $.ajax({
            url: subRacesURL,
            method: "GET"
        }).then(function (response) {
            var results = response.results.map(characterObject => characterObject.name);
            console.log(results);
    
            for(let i= 0; i < results.length; i++){
                $("#subRace-input").append($(`<option value = ${results[i]}> ${results[i]} </option>`));
            }
        })
        }
        callSubRacesAPI();




     function callSubClassesAPI() {
          $.ajax({
               url: subClassesURL,
              method: "GET"
         }).then(function (response) {
               var results = response.results.map(characterObject => characterObject.name);
               console.log(results);
        
             for(let i= 0; i < results.length; i++){
                 $("#subClass-input").append($(`<option value = ${results[i]}> ${results[i]} </option>`));
             }
         })
         }
         callSubClassesAPI();










});



//drop down races
    //drop down classes
    // function fillSelection() {
    //     select[0] = true;
    //     $("#CharaClass").append($("<div>").addClass("dropdown").att("id", "charaClass-div"));
    //     $("charaClass-div").append($("<label>").attr("id", "classes-list").addClass("dropdown-content").text("Classes: "));
    //     $("charaClass-div").append($("<select>").addClass("selection").attr("id", "dI-sel"));
    //     queryURL = classesURL;
    //     callAPI(queryURL);
    // }



//dropdown subclass *MATCH THE MOTHER CLASS*

//dropdown subrace *MATCH MOTHER RACE





            // results.forEach(obj => {
            //     $("#dropdown-Sel").append(`<option value="select">${obj.name}</option>`);
            // });
            // results = results.map(obj => {
            //     `<option value="select">${obj}</option>`
            // }).join("");
            // let dropdown = `
            // <div class="form-group">
            //     <label for="class">Class</label>
            //     <select name="Class" class="form-control" id="class">
            //             ${results}       
            //     </select>
            // </div>
            // `;
            // console.log(dropdown);
            // console.log(results);
            // $("#characterArray").html(dropdown);


        // let resultsString = results.map(name=>{
        //     `
        //         <option value="select">${name}</option>

        //     `
        // }).join("");
        // console.log (resultsString);
        // if (select[0] === true) {
        //     $("#classes-sel").append($("<option>").addClass("dI-op").text("Create").val("selected disabled"));
        //     for (var i = 0; i < array.length; i++) {
        //         $("classes-sel").append($("<option>").addClass("dI-op").text(array[i]));
        //     }
        //     select[0] = false;
        // fillSelection();
        // }



