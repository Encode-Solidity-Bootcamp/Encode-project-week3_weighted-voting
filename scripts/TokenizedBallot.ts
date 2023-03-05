
import { ethers } from "hardhat";
import { MyToken, Ballot__factory, MyToken } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("1000")

async function main() {

    //This is for the token Minting

    const mintTx = await contract.mint(account1.address, MINT_VALUE)
    const mintTxReceipt = await mintTx.wait();
    console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`);
    const tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1)} Vote Tokens` );

    //This is the Tokenized Ballot
    const [deployer,account1,account2] = await ethers.getSigners();
    const contractTokenizedBallot = new Ballot__factory(deployer);
    const contractDeploy: MyToken = await contractTokenizedBallot.deploy();
    const deployedTransactionReceipt = await contractDeploy.deployTransaction.wait();
    console.log(`The Tokenized Ballot was deployed at the block ${deployedTransactionReceipt.blockNumber} `);

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
