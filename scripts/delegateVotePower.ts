import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Ballot__factory, MyToken__factory } from "../typechain-types";
dotenv.config();

async function main() {
    //receive address of ballot and proposal index from CLI
    const tokenAddress = process.argv[2];
    const address = process.argv[3];
    
    //get a provider
    const provider = new ethers.providers.InfuraProvider(
        "goerli",
        process.env.INFURA_API_KEY
        ); 

        //8612873

    //get your signer from .env 
    const privateKey = process.env.PRIVATE_KEY;

    if(!privateKey || privateKey.length <= 0)
        throw new Error("Missing private key");

    const wallet = new ethers.Wallet(privateKey);
    
    const signer = wallet.connect(provider);
    console.log(`Connected to the wallet ${wallet.address}`)

    //create a contract instance (attach)
    const tokenContractFactory =  new MyToken__factory(signer);
    const tokenContractInstance = tokenContractFactory.attach(tokenAddress)

    //interact

    const delegateTx = await tokenContractInstance.delegate(address);
    console.log(`self delegation in progress`);
    const delegateTxReceipt = await delegateTx.wait();
    console.log(`Tokens delegated from ${signer.address} for ${signer.address} at block ${delegateTxReceipt.blockNumber}`);
    console.log(delegateTxReceipt);
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  