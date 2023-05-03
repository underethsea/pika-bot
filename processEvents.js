import { Decimals } from "./utils/utils.js";
import { MessageEmbed } from "discord.js";
import { ABI } from "./constants/abi.js";
import { CONTRACT, PRODUCTS } from "./constants/constants.js";

import ethers from "ethers";

// threshold in USD for alerts for opening size (margin * leverage)
const openAlertThreshold = 500;

// threshold in USD for alerts for closing position pnl
const closeAlertThreshold = 100

// block explorer
const explorerURL = "https://optimistic.etherscan.io/tx/"

async function ProcessNewPosition(eventData) {
    const perpInterface = new ethers.utils.Interface(ABI.PERPV3);

    // console.log("processing new position event", eventData.data);
    // console.log(iface.parseTransaction({ data: depositEvent.data }));
    let decoded = perpInterface.decodeEventLog(
        "NewPosition",
        eventData.data
    );
    let parsed = perpInterface.parseLog(eventData)
    // console.log(parsed)
    // console.log(eventData.topics[3])
    // console.log(ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3]))
    // let productId = ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3])
    // productId = productId.toString()
    // productId = parseInt(productId)
    // console.log(productId)


    // console.log("event data ---"
    // , eventData)
// console.log("-----decoded\n", decoded)

    let newPosition = {
        productId: parsed.args.productId.toString(),
        positionId: parseInt(parsed.args.positionId),
        user: parsed.args.user,
        isLong: decoded.isLong,
        price: parseInt(decoded.price),
        oraclePrice: parseInt(decoded.oraclePrice),
        margin: parseInt(decoded.margin / 1e8),
        leverage: parseInt(decoded.leverage) / 1e8,
        fee: parseInt(decoded.fee),
    };
   
    // console.log("-----new position\n", newPosition)


    if (newPosition.margin * newPosition.leverage > openAlertThreshold) {
        //  // LONG entryPrice−entryPrice∗liquidationThreshold/leverage
        // ​ // SHORT entryPrice+entryPrice∗liquidationThreshold/leverage
        let isLong = "SHORT"
        // let liquidationPrice = newPosition.price / 1e8 - (newPosition.price / 1e8 * (.8 / (newPosition.leverage / 1e8)))

        if (newPosition.isLong) {
            isLong = "LONG";
            // liquidationPrice = newPosition.price / 1e8 - (newPosition.price / 1e8 * (.8 / (newPosition.leverage / 1e8)))
        }

        let newPositionEmbed = ""
        // const newPositionEmbed = new MessageEmbed()
        //     .setColor("#fbe64d")
        //     .setTitle(
        //         ":bank:  NEW " + title + " `$" +
        //         Decimals(
        //             newPosition.margin / 1e8) + "`"

        //     )
        //     .setDescription(
        //         "Leverage `" + Decimals(newPosition.leverage / 1e8) + "x`\n" +
        //         "Price `$" + Decimals(newPosition.price / 1e8) + "`\n" +
        //         "Liquidation Price `$" + Decimals(liquidationPrice) + "`"

        //     )
        //     .setThumbnail(PRODUCTS[newPosition.productId].icon)
        //     .addField(
        //         "\u200B",
        //         " [View Transction](" +
        //         explorerURL +
        //         eventData.transactionHash +
        //         ")"
        //     );
        let tweet = ""
        console.log(newPosition.user  + " open " + PRODUCTS[newPosition.productId].name + " " + isLong + " margin of " + newPosition.margin + " leverage " + newPosition.leverage )
        let discordTest = newPosition.user  + " open " + PRODUCTS[newPosition.productId].name + " " + isLong + " margin of " + newPosition.margin + " leverage " + newPosition.leverage
        return { newPositionEmbed: newPositionEmbed, tweet: tweet, discordTest: discordTest };
    } else {
        console.log(newPosition.user + " open " + PRODUCTS[newPosition.productId].name +  " " + isLong + " margin of " + newPosition.margin + " leverage " + newPosition.leverage)

        console.log(
            
            "position not meeting threshold for alert, amt ",
            newPosition.margin
        );
        return null;
    }
}


async function ProcessClosePosition(eventData) {
    const perpInterface = new ethers.utils.Interface(ABI.PERPV3);

    // console.log("processing close position event", eventData.data);
    let decoded = perpInterface.decodeEventLog(
        "ClosePosition",
        eventData.data
    );
    let parsed = perpInterface.parseLog(eventData)

    // console.log("pasrsed", parsed)

    // let productId = ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3])
    // productId = productId.toString()
    // productId = parseInt(productId)
    let closePosition = {
        positionId: parsed.args.positionId.toString(),
        productId: parseInt(parsed.args.productId),
        user: parsed.args.user,
        price: parseInt(decoded.price),
        entryPrice: parseInt(decoded.entryPrice),
        margin: parseInt(decoded.margin) / 1e8,
        leverage: parseInt(decoded.leverage) / 1e8,
        fee: parseInt(decoded.fee),
        pnl: parseInt(decoded.pnl) / 1e8,
        wasLiquidated: decoded.wasLiquidated,

    };
    // console.log(ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3]))
   
    let liquidatedText = closePosition.wasLiquidated ? " liquidated " : " closed "

    // console.log("-----decoded\n", decoded)
    // console.log("-----close position\n", closePosition)
    if (closePosition.pnl > closeAlertThreshold) {
        let title = "CLOSED"
        if (closePosition.wasLiquidated === 'true') {
            title = 'LIQUIDATED'
        }

        let closePositionEmbed = ""
        // const closePositionEmbed = new MessageEmbed()
        //     .setColor("#fbe64d")
        //     .setTitle(
        //         ':bank: ' + title + ' $' +
        //         Decimals(
        //             closePosition.margin / 1e8)

        //     )
        //     .setDescription(
        //         "Entry Price `" + Decimals(closePosition.entryPrice / 1e8) + "`\n" +
        //         "Leverage `" + Decimals(closePosition.leverage / 1e8) + "x`\n" +
        //         "PNL `" + Decimals(closePosition.pnl / 1e8) + "`"

        //     )
        //     .setThumbnail(PRODUCTS[closePosition.productId].icon)
        //     .addField(
        //         "\u200B",
        //         " [View Transction](" +
        //         explorerURL +
        //         eventData.transactionHash +
        //         ")"
            // ); 
            let tweet = ""
            console.log(closePosition.user + liquidatedText + PRODUCTS[closePosition.productId].name + " PNL of " + closePosition.pnl)
            let discordTest = closePosition.user + liquidatedText + PRODUCTS[closePosition.productId].name + " PNL of " + closePosition.pnl
        return { closePositionEmbed: closePositionEmbed, tweet: tweet, discordTest: discordTest };
    } else {console.log(closePosition.user  + liquidatedText + PRODUCTS[closePosition.productId].name + " PNL of " + closePosition.pnl)

        console.log(
            "position not meeting threshold for alert, amt ",
            closePosition.margin
        );
        return null;
    }
}

export{ProcessClosePosition,ProcessNewPosition}