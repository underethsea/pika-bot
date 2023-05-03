// -------------V2----------------------
// const EVENTS = {
//   CLOSEPOSITION: {
//     TOPIC: "",
//   },
//   NEWPOSITION: {
//     TOPIC: "0x340ad004f2cc7f2adb2ebb38a9900cbc5888c8c67aeab767e74b16dbe1c87a4a",
//   },
// };

// ----------V3-----------------------
const EVENTS = {
  CLOSEPOSITION: {
    TOPIC: "0x980658f6b65b51ce7d353bc2f9110e33617a69ab8dd85ed76e70546542ebea25",
  },
  NEWPOSITION: {
    TOPIC: "0xf0179f06d5592030053869d8d0ae508420786cda1b88f04f1611215f029a35ab",
  },
};

const CONTRACT = {
  PERPV3: { ADDRESS: "0xD5A8f233CBdDb40368D55C3320644Fb36e597002" },
  PERPV2: { ADDRESS: "0x2FaE8C7Edd26213cA1A88fC57B65352dbe353698" },
};
const PRODUCTS = {
  1: { name: "ETH" },
  2: { name: "BTC" },
  3: { name: "SOL" },
  4: { name: "AVAX" },
  5: { name: "MATIC" },
  6: { name: "LINK" },
  7: { name: "SNX" },
  8: { name: "AAVE" },
  9: { name: "APE" },
  10: { name: "AXS" },
  11: { name: "UNI" },
  12: { name: "OP" },
  13: { name: "DOGE" },
  14: { name: "CRV" },
  15: { name: "NEAR" },
  16: { name: "ATOM" },
  17: { name: "EUR" },
  18: { name: "JPY" },
  19: { name: "GBP" },
  20: { name: "AUD" },
  21: { name: "CAD" },
  22: { name: "BNB" },
  23: { name: "DYDX" },
  24: { name: "FTM" },
  25: { name: "SAND" },
};
// 16: {
//   symbol: "ETH",
//   geckoID: "ethereum",
//   icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/1202px-Ethereum_logo_translucent.svg.png",
// },
// 17: {
//   symbol: "BTC",
//   geckoID: "bitcoin",
//   icon: "https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Emblem.png",
// },
// 18: {
//   symbol: "LINK",
//   geckoID: "chainlink",
//   icon: "https://cryptologos.cc/logos/chainlink-link-logo.png",
// },
// 19: {
//   symbol: "SNX",
//   geckoID: "havven",
//   icon: "https://cryptologos.cc/logos/synthetix-network-token-snx-logo.png",
// },
// 20: {
//   symbol: "SOL",
//   geckoID: "solana",
//   icon: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
// },
// 21: {
//   symbol: "AVAX",
//   geckoID: "avalanche-2",
//   icon: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",
// },
// 22: {
//   symbol: "MATIC",
//   geckoID: "matic-network",
//   icon: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/DPYBKVZG55EWFHIK2TVT3HTH7Y.png",
// },
// 23: {
//   symbol: "AAVE",
//   geckoID: "aave",
//   icon: "https://cryptologos.cc/logos/aave-aave-logo.png",
// },
// 24: {
//   symbol: "APE",
//   geckoID: "apecoin",
//   icon: "https://thegivingblock.com/wp-content/uploads/2022/03/APECOIN.png",
// },
// 25: {
//   symbol: "AXS",
//   geckoID: "axie-infinity",
//   icon: "https://simpleswap.io/static/img/currencies/axs.svg",
// },
// 26: {
//   symbol: "UNI",
//   geckoID: "uniswap",
//   icon: "https://lh3.googleusercontent.com/ONZYvg_BD8Wym3VF0drcWCK-ONcOBt2gMFqh4q46TBlHpvGMGH6W59q93jZc7jYR3FYBinrZXOEgYM5LcILkUXEe0C5DBQ4zL5tN3g=w303",
// },

export { CONTRACT, EVENTS, PRODUCTS };
