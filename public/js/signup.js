$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  const nicknameInput = $("input#nickname-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      nickname: nicknameInput.val().trim(),
      password: passwordInput.val().trim()
    };


    //I need to handle this more gracefully
    if (!userData.email || !userData.nickname || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);

    emailInput.val("");
    nicknameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    //maybe I can just send the object
    const{email, nickname, password} = userData;
    $.post("/api/signup", {
      email: email,
      password: password,
      nickname: nickname
    })
      .then(() => {
        $.post("/api/campaigns", {
          name: "Character Sandbox",
          campaignSummary: "This is a sandbox for you to store characters who are not in a campaign."
        }).then(() => {
          window.location.replace("/members");
        });
      }).catch(handleLoginErr);
  };

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
