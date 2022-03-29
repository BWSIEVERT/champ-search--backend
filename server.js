const express = require('express');
const cors = require('cors');
const {
    devKey,
    routeNA1
} = require('./environmentConfig');
const { default: axios } = require('axios');
const app = express();
const PORT = 9000;

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome message successful')
})

// client sends summoner name -> server hits riot endpoints -> backend sends data to client
app.post('/summoner/riot/compiled-data/', async (req, res) => {
    try {
        const summoner = req.body.summoner
        const accountURL = `${routeNA1}lol/summoner/v4/summoners/by-name/${summoner}${devKey}`
        // const matchListURL = `${routeNA1}lol/match/v5/matches/by-puuid/ids${devKey}`
        await axios.get(accountURL)
            .then((res) => {
                const summonerPuuid = res.puuid;
                res.send(summonerPuuid);
            })
            .catch((error) => {
                res.status(404).send({
                    message: `Summoner data could not be found for summoner name: ${summoner}.`,
                    error: error
                })
            })
        // await axios.get()

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})


//
app.listen(process.env.PORT || 9000, () => {
    console.log(`*** Server is running! ***`)
})