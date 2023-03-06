import { ethers } from "ethers";
import * as dotenv from "dotenv";
import {MyToken, MyToken__factory } from "../typechain-types";
dotenv.config();

async function main() {
//receive addresss of voters as parameter from CLI
// const args = process.argv;
// const addresses = args.slice(2);

//tokenAddress = 0x261F475a207363aCdB9D018299f0678eFc77837E
const tokenAddress = process.argv[2];
const address = process.argv[3];
const tokenAmount = process.argv[4];

//get a provider
const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
    );

//get your signer from .env
 const privateKey = process.env.PRIVATE_KEY;

 if(!privateKey || privateKey.length <= 0)
    throw new Error("Missing private key");

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
console.log(`Connected to the wallet ${wallet.address}`)

//create a contract instance (attach)
const factory =  new MyToken__factory(signer);
const contractInstance = factory.attach(tokenAddress)

//interact
const transactionResponse = await contractInstance.transfer(address, tokenAmount);
console.log(`Transferring tokens to ${address} `);
const txReceipt = await transactionResponse.wait(1);
console.log(txReceipt);
console.log(`transfer successful`)

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });