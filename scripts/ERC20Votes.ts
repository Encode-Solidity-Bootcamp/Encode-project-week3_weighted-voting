import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10")

async function main(){
     //Deploy the contract
    const [deployer, account1, account2] = await ethers.getSigners();
    const contractFactory = new MyToken__factory(deployer);
    const contract: MyToken = await contractFactory.deploy();
    const deployedTransactionReceipt = await contract.deployTransaction.wait()
    console.log(`The Tokenized votes contract was deployed at the block ${deployedTransactionReceipt.blockNumber}`);
   
    //Mint some tokens
     
    const mintTx = await contract.mint(account1.address, MINT_VALUE)
    const mintTxReceipt = await mintTx.wait();
    console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`);
    //check the voting power
    const tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1) }`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});