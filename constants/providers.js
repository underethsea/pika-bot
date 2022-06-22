import dotenv from "dotenv";
dotenv.config();
import ethers from "ethers"


const optimismEndpoint = "https://mainnet.optimism.io";

const PROVIDER = {

  OPTIMISM: new ethers.providers.JsonRpcProvider(optimismEndpoint),

};

export { PROVIDER };
