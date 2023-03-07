
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Ballot__factory } from "../typechain-types";

//yarn run ts-node --files scripts/deployBallot.ts "[david, boma, leo]" "0x261F475a207363aCdB9D018299f0678eFc77837E" "8612873"
dotenv.config();

function convertStringArrayToBytes32(array: string[]) {

    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
      }
      return bytes32Array;
}

async function main() {

//   const args = process.argv.slice(2);
//   const proposals = JSON.parse(args[0]);
//   const tokenContract = args[1]; 
//   const targetBlockNumber = parseInt(args[2]);
  
//   const proposals = process.argv.slice(2, -2);
//   const tokenContract = process.argv[process.argv.length - 2];
//   const targetBlockNumber = process.argv[process.argv.length - 1];

  const args = process.argv.slice(2);
  const proposals = args[0].split(',');
  const tokenContract = args[1];
  const targetBlockNumber = args[2];
  
  if(proposals.length <= 0) throw new Error("Missing parameters: proposals");

  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
    );
  
  const privateKey = process.env.PRIVATE_KEY;

  if(!privateKey || privateKey.length <= 0)
    throw new Error("Missing private key");
  const wallet = new ethers.Wallet(privateKey);
  console.log(`Connected to the wallet ${wallet.address}`)
     
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  console.log(`Wallet balance: ${balance} Wei`);
  
  console.log("Deploying Ballot contract");
//   console.log("Proposals: ");
//   proposals.forEach((element, index) => {
//     console.log(`Proposal No. ${index + 1}: ${element}`);
//   });
   const ballotContractFactory = new Ballot__factory(signer);
  //console.log("Deploying contract ..."); 
  const ballotContract = await ballotContractFactory.deploy(
    convertStringArrayToBytes32(proposals), tokenContract, targetBlockNumber
    );
   
    const deployTxReceipt = await ballotContract.deployTransaction.wait(1);
    console.log(
        `The Ballot contract was deployed at the address ${ballotContract.address}`
    );
    console.log({deployTxReceipt});


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
