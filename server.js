const express = require("express");
const cors = require("cors");
const { devKey, routeNA1 } = require("./environmentConfig");
const { default: axios } = require("axios");
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
      res.status(200).send(response.data.puuid);
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
        const matchListURL = `${routeNA1}lol/match/v5/matches/by-puuid/${accountResponse.data.puuid}/ids${devKey}`;
        await axios.get(matchListURL).then((response) => {
            res.status(200).send(response.data)
        })
    } catch(error) {
        res.status(404).send({
            errorMessage: error.message,
            errorDescription: `A match list with the puuid of ${req.body.puuid} could not be found.`
        })
    }
    
})

//
app.listen(process.env.PORT || 9000, () => {
  console.log(`*** Server is running! ***`);
});
