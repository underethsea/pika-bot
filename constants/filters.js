import { CONTRACT, EVENTS } from "./constants.js"
import ethers from "ethers"

const FILTERS = {
  NEWPOSITION: {
    address: CONTRACT.PERPV2.ADDRESS,
    topics: [EVENTS.NEWPOSITION.TOPIC]
  },
  CLOSEPOSITION: {
    address: CONTRACT.PERPV2.ADDRESS,
    topics: [EVENTS.CLOSEPOSITION.TOPIC]
  }
}
export { FILTERS };
