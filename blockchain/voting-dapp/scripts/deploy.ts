import { ethers } from "hardhat";

async function main() {
  // Replace "YourContract" with the name of your contract
  const ContractFactory = await ethers.getContractFactory("YourContract");
  const contract = await ContractFactory.deploy();

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
