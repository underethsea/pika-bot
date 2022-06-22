import { Decimals } from "./utils/utils.js";
import { MessageEmbed } from "discord.js";
import { ABI } from "./constants/abi.js";
import { CONTRACT, PRODUCTS } from "./constants/constants.js";

import ethers from "ethers";

// threshold in USD for alerts
const alertThreshold = 50;

// block explorer
const explorerURL = "https://optimistic.etherscan.io/tx/"

async function ProcessNewPosition(eventData) {
    const perpInterface = new ethers.utils.Interface(ABI.PERPV2);

    console.log("processing new position event", eventData.data);
    // console.log(iface.parseTransaction({ data: depositEvent.data }));
    let decoded = perpInterface.decodeEventLog(
        "NewPosition",
        eventData.data
    );
    console.log(eventData.topics[3])
    console.log(ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3]))
    let productId = ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3])
    productId = productId.toString()
    productId = parseInt(productId)
    console.log(productId)
    let newPosition = {
        productId: productId,
        positionId: parseInt(decoded[0].toString()),
        user: decoded[1].toString(),
        isLong: decoded[3],
        price: parseInt(decoded[4].toString()),
        oraclePrice: parseInt(decoded[5].toString()),
        margin: parseInt(decoded[6].toString()),
        leverage: parseInt(decoded[7].toString()),
        fee: parseInt(decoded[8].toString()),
    };

    console.log("event data ---"
        , eventData)
    console.log("-----decoded\n", decoded)
    console.log("-----new position\n", newPosition)


    if (newPosition.margin / 1e8 > alertThreshold) {
        //  // LONG entryPrice−entryPrice∗liquidationThreshold/leverage
        // ​ // SHORT entryPrice+entryPrice∗liquidationThreshold/leverage
        let title = "SHORT"
        let liquidationPrice = newPosition.price / 1e8 - (newPosition.price / 1e8 * (.8 / (newPosition.leverage / 1e8)))

        if (newPosition.isLong) {
            title = "LONG";
            liquidationPrice = newPosition.price / 1e8 - (newPosition.price / 1e8 * (.8 / (newPosition.leverage / 1e8)))
        }

        const newPositionEmbed = new MessageEmbed()
            .setColor("#fbe64d")
            .setTitle(
                ":bank:  NEW " + title + " `$" +
                Decimals(
                    newPosition.margin / 1e8) + "`"

            )
            .setDescription(
                "Leverage `" + Decimals(newPosition.leverage / 1e8) + "x`\n" +
                "Price `$" + Decimals(newPosition.price / 1e8) + "`\n" +
                "Liquidation Price `$" + Decimals(liquidationPrice) + "`"

            )
            .setThumbnail(PRODUCTS[newPosition.productId].icon)
            .addField(
                "\u200B",
                " [View Transction](" +
                explorerURL +
                eventData.transactionHash +
                ")"
            );
        let tweet = ""
        return { newPositionEmbed: newPositionEmbed, tweet: tweet };
    } else {
        console.log(
            "position not meeting threshold for alert, amt ",
            newPosition.margin / 1e8
        );
        return null;
    }
}


async function ProcessClosePosition(eventData) {
    const perpInterface = new ethers.utils.Interface(ABI.PERPV2);

    console.log("processing close position event", eventData.data);
    let decoded = perpInterface.decodeEventLog(
        "ClosePosition",
        eventData.data
    );
    let productId = ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3])
    productId = productId.toString()
    productId = parseInt(productId)
    let closePosition = {
        productId: productId,
        positionId: decoded[0].toString(),
        user: decoded[1],
        price: parseInt(decoded[3].toString()),
        entryPrice: parseInt(decoded[4].toString()),
        margin: parseInt(decoded[5].toString()),
        leverage: parseInt(decoded[6].toString()),
        fee: parseInt(decoded[7].toString()),
        pnl: parseInt(decoded[8].toString()),
        wasLiquidated: decoded[9].toString(),

    };
    console.log(eventData.topics[3])
    console.log(ethers.utils.defaultAbiCoder.decode(['uint256'], eventData.topics[3]))
    console.log("event data ---"
        , eventData)
    console.log(eventData.topics[1])

    console.log("-----decoded\n", decoded)
    console.log("-----close position\n", closePosition)
    if (closePosition.margin / 1e8 > alertThreshold) {
        let title = "CLOSED"
        if (closePosition.wasLiquidated === 'true') {
            title = 'LIQUIDATED'
        }

        const closePositionEmbed = new MessageEmbed()
            .setColor("#fbe64d")
            .setTitle(
                ':bank: ' + title + ' $' +
                Decimals(
                    closePosition.margin / 1e8)

            )
            .setDescription(
                "Entry Price `" + Decimals(closePosition.entryPrice / 1e8) + "`\n" +
                "Leverage `" + Decimals(closePosition.leverage / 1e8) + "x`\n" +
                "PNL `" + Decimals(closePosition.pnl / 1e8) + "`"

            )
            .setThumbnail(PRODUCTS[closePosition.productId].icon)
            .addField(
                "\u200B",
                " [View Transction](" +
                explorerURL +
                eventData.transactionHash +
                ")"
            ); let tweet = ""
        return { closePositionEmbed: closePositionEmbed, tweet: tweet };
    } else {
        console.log(
            "position not meeting threshold for alert, amt ",
            closePosition.margin / 1e8
        );
        return null;
    }
}

export{ProcessClosePosition,ProcessNewPosition}