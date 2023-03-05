
import { ethers } from "hardhat";
import { MyToken, Ballot__factory, MyToken, MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("1000")

async function main() {


    const proposalNames = [],
    let tokenContract = ;
    const targetBlockNumber = ;


    //This is for the token Minting
    tokenContract = await 
    //This is the Tokenized Ballot
    const [deployer,account1,account2] = await ethers.getSigners();
    const contractTokenizedBallot = new Ballot__factory(deployer);
    const contractDeploy: MyToken = await contractTokenizedBallot.deploy(a, b, c);
    const deployedTransactionReceipt = await contractDeploy.deployTransaction.wait();
    console.log(`The Tokenized Ballot was deployed at the block ${deployedTransactionReceipt.blockNumber} `);
    
    

    // const tokenFactory = new MyToken__factory(deployer);
    // const mintTx = await tokenFactory.mint()
    // const mintTxReceipt = await mintTx.wait();
    // console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`);
    // const tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    // console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1)} Vote Tokens` );

    //Transfer tokens to everyone else

    // Delegating Votes(either to yourself or someone else)

    // Cast Vote

    // Check voting Power

    // Query result from Proposals
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
