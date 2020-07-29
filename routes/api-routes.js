// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      nickName: req.body.nickname
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    };
  });

  // get all characters for a user
  app.get('/api/characters/', (req, res) => {
    let userId = "";
    if (req.user) {
      userId = req.user.id;
    }
    db.Character.findAll({
      where: {
        id: userId
      }
    }).then(dbCharacters => {
      res.json(dbCharacters);
    }).catch(err => {
      res.status(500).end();
    });
  });

  // get all campaigns for a user
  app.get('/api/campaigns/', (req, res) => {
    let userId = "";
    if (req.user) {
      userId = req.user.id;
    }
    db.Campaign.findAll({
      where: {
        id: userId
      }
    }).then(dbCampaigns => {
      res.json(dbCampaigns);
    }).catch(err => {
      res.status(500).end();
    });
  });

  // get all the characters for a specific campaign
  // app.get("/api/characters/:campaignId", (req, res) => {
  //   let userId = "";
  //   if(req.user) {
  //     userId = req.user.id;
  //   }
  //   //find all where the userId = id and campaignId = campaignId
  //   db.Character.findAll({
  //     where: {
  //       id:
  //     }
  //   })
  // })


};
/*
GET REQUESTS
  get all characters for a user
  '/api/characters/'
  get all campaigns for a user
  '/api/campaigns/'
  get a single character
  '/api/characters/:id'
  get a single campaign
  '/api/campaigns/:id'


DELETE 
  delete a character
  '/api/campaigns/:id'


  create a character

  PUT/PATCH
  update a character
  '/api/campaigns/:id'

  create a campaign
  delete a campaign
  update a campaign
  */
