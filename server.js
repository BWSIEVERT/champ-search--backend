const express = require("express");
const cors = require("cors");
const { devKey, routeNA1, regionAmericas } = require("./environmentConfig");
const { default: axios } = require("axios");
const { response } = require("express");
const app = express();
const PORT = 9000;

// middleware
app.use(express.json());
app.use(cors());

// welcome message
app.get("/", (req, res) => {
  res.send("Welcome message successful");
});

// client sends summoner name -> server hits riot endpoint -> server sends puuid to client
app.post("/summoner/riot/", async (req, res) => {
  try {
    const summoner = req.body.summoner;
    const accountURL = `${routeNA1}lol/summoner/v4/summoners/by-name/${summoner}${devKey}`;
    await axios.get(accountURL).then((response) => {
      res.status(200).send({
          puuid: response.data.puuid
      });
    });
  } catch (error) {
    res.status(404).send({
      errorMessage: error.message,
      errorDescription: `A summoner with the name of ${req.body.summoner} could not be found.`
    });
  }
});

// client sends puuid -> server hits riot endpoint -> server sends match list to client
app.post("/summoner/matches/riot/", async (req, res) => {
    try{
        const puuid = req.body.puuid
        const matchListURL = `${regionAmericas}lol/match/v5/matches/by-puuid/${puuid}/ids${devKey}`;
        await axios.get(matchListURL).then((response) => {
            res.status(200).send({
                matchList: response.data
            })
        })
    } catch(error) {
        res.status(404).send({
            errorMessage: error.message,
            errorDescription: `A match list with the puuid of ${req.body.puuid} could not be found.`
        })
    }
    
})

// client sends match id -> server hits riot endpoint -> server sends match data to client
app.post("summoner/matches/compiled/riot/", async (req, res) => {
    const matchListIds = {
        matchOne: req.body[0],
        // matchTwo: req.body.matchTwo,
        // matchThree: req.body.matchThree,
        // matchFour: req.body.matchFour,
        // matchFive: req.body.matchFive,
    }
    const matchListUrls = {
        matchDataOneURL: `${regionAmericas}lol/match/v5/matches/${matchListIds.matchOne}`,
        // matchDataTwoURL: `${regionAmericas}lol/match/v5/matches/${matchListIds.matchTwo}`,
        // matchDataThreeURL: `${regionAmericas}lol/match/v5/matches/${matchListIds.matchThree}`,
        // matchDataFourURL: `${regionAmericas}lol/match/v5/matches/${matchListIds.matchFour}`,
        // matchDataFiveURL: `${regionAmericas}lol/match/v5/matches/${matchListIds.matchFive}`,
    }
    try {
        await axios.all([matchDataOneURL]).then(axios.spread(function(res1, res2, res3, res4, res5) {
            res.status(200).send({
                matchData: response.data
            })
        }))
    } catch (error) {
        res.status(404).send({
            errorMessage: error.message,
            errorDescription: `Some match data for ${matchListIds} could not be found.`
        })
    }
})





//
app.listen(process.env.PORT || 9000, () => {
  console.log(`*** Server is running on port ${process.env.PORT}! ***`);
});
