import dotenv from "dotenv";
dotenv.config();
import ethers from "ethers"


const optimismEndpoint = "https://opt-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY;

const PROVIDER = {

  OPTIMISM: new ethers.providers.JsonRpcProvider(optimismEndpoint),

};

export { PROVIDER };
