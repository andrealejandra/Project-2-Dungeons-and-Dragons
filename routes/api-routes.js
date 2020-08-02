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
        //this makes another ajax call
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
      res.status(401).json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        nickName: req.user.nickName,
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
    console.log(userId);
    db.Character.findAll({
      where: {
        id: userId
      }
    }).then(dbCharacters => {
      res.json(dbCharacters);

      //res.redirect(307, "/api/login");

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
        UserId: userId
      }
    }).then(dbCampaigns => {
      res.json(dbCampaigns);
    }).catch(err => {
      res.status(500).end();
    });
  });

  // get a single character
  // app.get('/api/characters/:characterId', (req, res) => {
  //   let userId = "";
  //   if (req.user) {
  //     userId = req.user.id;
  //   }
  //   //find a character with a userId and a characterId
  //   db.Character.findOne({
  //     where: {
  //       UserId: userId,
  //       id: req.params.characterId
  //     }
  //   }).then(dbCharacter => {
  //     res.json(dbCharacter);
  //   }).catch(err => {
  //     res.status(500).end();
  //   })
  // });

  //find a campaign with a userId and a campaignName
  app.get('/api/campaigns/:campaignName', (req, res) => {
    let userId = "";
    if (req.user) {
      userId = req.user.id;
    }
    db.Campaign.findOne({
      where: {
        UserId: userId,
        name: req.params.campaignName
      }
    }).then(dbCampaign => {
      res.json(dbCampaign)
    }).catch(err => {
      res.status(500).end();
    });
  });

  //find a campaign id with a userId and a campaignName
  app.get('/api/campaigns/name/:campaignName', (req, res) => {
    let userId = req.user ? req.user.id : "";
    db.Campaign.findOne({
      where: {
        UserId: userId,
        name: req.params.campaignName
      }
    }).then(dbCampaign => {
      res.json(dbCampaign.id)
    }).catch(err => {
      res.status(500).end();
    });
  });

  //get all the characters for a specific campaign when given an id
  app.get("/api/characters/:campaignId", (req, res) => {
    db.Character.findAll({
      where: {
        CampaignId: req.params.campaignId
      }
    }).then(dbCharacters => {
      res.json(dbCharacters)
    }).catch(err => {
      res.status(500).end();
    });
  });

  app.get("/api/characters/id/:characterId", (req, res) => {
    console.log("You got here");
    db.Character.findOne({
      where: {
        id: req.params.characterId
      }
    }).then(dbCharacter => {
      res.json(dbCharacter);
    }).catch(err => {
      res.status(500).end();
    });
  });




  /* ********* I added work here
    - how to pass the userId through the post request?
    - do I need to include *include* in here?
    - can a user create a character outside a campaign?
    - would I also pass in the campaign id?
  */
  app.post('/api/characters', (req, res) => {

    db.Character.create({
      name: req.body.name,
      class: req.body.class,
      race: req.body.race,
      subClass: req.body.subClass,
      subRace: req.body.subRace,
      briefBio: req.body.briefBio,
      CampaignId: parseInt(req.body.campaign)

    }).then(dbCharacter => {
      res.json(dbCharacter.dataValues.id);
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    });
  });

  app.post('/api/campaigns', (req, res) => {
    let userId = "";
    if (req.user) {
      userId = req.user.id;
    }

    db.Campaign.create({
      name: req.body.name,
      campaignSummary: req.body.campaignSummary,
      UserId: userId
    }).then(dbCampaign => {
      res.json(dbCampaign);
    }).catch(err => {
      res.status(500).end();
    });
  });

  app.put("/api/characters", (req, res, next) => {
    db.Character.update(
      {
        name: req.body.name,
        class: req.body.class,
        race: req.body.race,
        subClass: req.body.subClass,
        subRace: req.body.subRace,
        briefBio: req.body.briefBio,
        CampaignId: parseInt(req.body.campaign)
      },
      {
        where:
        {
          id: req.body.id
        }
      }
    ).then(rowsUpdated => {
      res.json(rowsUpdated);
    }).catch(next);
  });

  app.delete("/api/characters/id/:id", (req, res) => {
    const id = req.params.id;
    db.Character.destroy({
      where: {id:id}
    }).then(deletedCharacter => {
      res.json(deletedCharacter);
    }).catch(err => {
      res.status(500).end();
    });
  });
};

/*
GET REQUESTS
  get all characters for a user [x]
  get all campaigns for a user [x]

  get a single character [x]
  get a single campaign [x]



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
