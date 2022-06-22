import "dotenv/config";
import ethers from "ethers";
import fetch from "cross-fetch";

import Discord from "discord.js";
import { Client, Intents } from "discord.js";

import { GeckoPrice } from "./utils/geckoFetch.js";

import { FILTERS } from "./constants/filters.js";
import { PROVIDER } from "./constants/providers.js";
import { ProcessClosePosition, ProcessNewPosition } from "./processEvents.js";

// twitter alerts disabled
// import Twit from "twit";

// toggle Twitter alerts on and off
var twitterOn = false;


// toggle between testing discord and public
const botTestChannelId = "932504732818362378"; // private discord
// const botTestChannelId = ""; // public bot channel


const client = new Discord.Client({
    partials: ["CHANNEL"],
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

// optional twitter alerts
const T = {};
if (twitterOn) {
    const T = new Twit({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        timeout_ms: 60 * 1000,
    });
}


async function sendTweet(tweet) {
    if (twitterOn) {
        T.post("statuses/update", tweet, function (err, data, response) {
            console.log(data.text);
        });
    }
}

async function botGo() {
    client.once("ready", () => {
        console.log("Ready!");
    });

    // perp v2 close position event listening and alert
    PROVIDER.OPTIMISM.on(FILTERS.CLOSEPOSITION, (closePositionEvent) => {
        try {
            ProcessClosePosition(closePositionEvent).then((result) => {
                if (result) {
                    console.log(result)
                    const testingChannel = client.channels.cache.get(botTestChannelId);
                    testingChannel.send({ embeds: [result.closePositionEmbed] });
                    sendTweet(result.tweet);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
        // perp v2 open position event listening and alert

    PROVIDER.OPTIMISM.on(FILTERS.NEWPOSITION, (newPositionEvent) => {
        try {
            ProcessNewPosition(newPositionEvent).then((result) => {
                if (result) {
                    console.log(result)
                    const testingChannel = client.channels.cache.get(botTestChannelId);
                    testingChannel.send({ embeds: [result.newPositionEmbed] });
                    sendTweet(result.tweet);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });


    client.login(process.env.BOT_KEY);
}

botGo();
