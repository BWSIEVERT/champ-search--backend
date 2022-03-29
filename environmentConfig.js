const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    devKey: process.env.DEV_API_KEY,

    routeBR1: process.env.BR1_ROUTE,
    routeEUN1: process.env.EUN1_ROUTE,
    routeJP1: process.env.JP1_ROUTE,
    routeKR: process.env.KR_ROUTE,
    routeLA1: process.env.LA1_ROUTE,
    routeLA2: process.env.LA2_ROUTE,
    routeNA1: process.env.NA1_ROUTE,
    routeOC1: process.env.OC1_ROUTE,
    routeTR1: process.env.TR1_ROUTE,
    routeRU: process.env.RU_ROUTE,

    regionAmericas: process.env.AMERICAS_REGION,
    regionAsia: process.env.ASIA_REGION,
    regionEurope: process.env.EUROPE_REGION
}