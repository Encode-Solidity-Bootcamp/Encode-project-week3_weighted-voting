import { ethers } from "ethers";
import * as dotenv from "dotenv";
import {MyToken__factory } from "../typechain-types";
dotenv.config();

const MINT_VALUE = ethers.utils.parseEther("6");

async function main() {

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
  
  console.log("Deploying Token contract");
 
 
  const tokenContractFactory = new MyToken__factory(signer);
  console.log("Deploying contract ..."); 
  const tokenContract = await tokenContractFactory.deploy();
  const tokenContractReceipt = await tokenContract.deployTransaction.wait();
  
    console.log(
        `The Ballot contract was deployed at the address ${tokenContract.address}`
    );
    console.log({tokenContractReceipt});

  
    //mint some tokens
    const mintTx = await tokenContract.mint(signer.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    console.log(`Tokens minted for ${signer.address} at block ${mintTxReceipt.blockNumber}`);
    const signerTokenBalance = await tokenContract.balanceOf(signer.address);
    console.log(`Account 1 has a balance of ${ethers.utils.formatEther(signerTokenBalance)} vote tokens`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
