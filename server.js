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

// functions
async function getAccountCredentials() {
    
    await axios.get(accountURL).then((response) => {
        const puuid = response.data.puuid
        return puuid;
    })
}

async function getAccountMatchList() {
    
    await axios.get(matchListURL).then((response) => {
        const accountMatchList = response.data
        return accountMatchList
    })
}

// client sends summoner name -> server hits riot endpoints -> backend sends data to client
app.post("/summoner/riot/compiled-data/", async (req, res) => {
  try {
    const accountURL = `${routeNA1}lol/summoner/v4/summoners/by-name/${summoner}${devKey}`;
    axios.get(accountURL).then((response) => {
        const matchListURL = `${routeNA1}lol/match/v5/matches/by-puuid/${response.data.puuid}/ids${devKey}`;
        if (response)
            axios.get(matchListURL).then((response) => {
                res.status(200).send(response.data)
            })
    })



  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

//
app.listen(process.env.PORT || 9000, () => {
  console.log(`*** Server is running! ***`);
});
