
import { ethers } from "hardhat";
import { TeamToken, Ballot__factory, MyToken, MyToken__factory, TeamToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("200000");
const blockNumber = 2;
let tokenAddress;

const proposalNames = [
    ethers.utils.formatBytes32String("apple"),
    ethers.utils.formatBytes32String("orange"),
    ethers.utils.formatBytes32String("kiwi"),
  ];

async function main() {

    const [deployer,account1,account2] = await ethers.getSigners();

    //This is for the token Minting
    const tokenContractFactory = new TeamToken__factory(deployer);
    const tokenContract = await tokenContractFactory.deploy();
    const tokenContractTxReceipt = await tokenContract.deployTransaction.wait();
    const mintTx = await tokenContract.mint(account1.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    tokenAddress = await tokenContractTxReceipt.contractAddress;
    console.log(`Tokens with Contract address ${tokenAddress} minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`);

    //Check the balance of the token to confirm Mint
    const balanceTokenMinted = await tokenContract.balanceOf(account1.address);
    console.log(`${account1.address} has a  ${ethers.utils.formatEther(balanceTokenMinted)} `)


    //This is the Tokenized Ballot
    
    const contractTokenizedBallot = new Ballot__factory(deployer);
    const contractDeploy = await contractTokenizedBallot.deploy(proposalNames, tokenAddress,blockNumber);
    const deployedTransactionReceipt = await contractDeploy.deployTransaction.wait();
    console.log(`The Tokenized Ballot was deployed at the block ${deployedTransactionReceipt.blockNumber} `);
    

    
    //TO DO

    //Transfer tokens to everyone else

    // Delegating Votes(either to yourself or someone else)

    // Cast Vote

    // Check voting Power
    

    // Query result from Proposals

    const proposalResult = await contractDeploy.winningProposal();
    const winningName = await contractDeploy.winnerName();
    console.log(`the winning proposal is ${winningName}, with ${proposalResult} votes`)
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
