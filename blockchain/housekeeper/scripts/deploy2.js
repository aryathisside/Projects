const hre = require("hardhat");

async function main() {
  // Setup accounts
  const signers = await hre.ethers.getSigners();  // Get available signers
  console.log("Number of signers:", signers.length);  // Debugging line to show how many signers are available

  // Assign the first five signers to deployer, buyer, seller, inspector, lender
  const [deployer, buyer, seller, inspector, lender] = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x284782d7c1325d9bC8266a2365c9d96327bf2f12","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
    ,"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"];
      // Get balance for deployer
  const balance = await hre.ethers.provider.getBalance(deployer);
  console.log(`Deployer balance: ${balance} SepoliaETH`);

  // Get balance for buyer
  const balanceBuyer = await hre.ethers.provider.getBalance(buyer);
  console.log(`Buyer balance: ${balanceBuyer} SepoliaETH`);

  // Display the addresses
  console.log(`Deploying contracts with the account: ${await deployer.getAddress}`);
  console.log(`Buyer: ${buyer.address}`);
  console.log(`Seller: ${seller.address}`);
  console.log(`Inspector: ${inspector.address}`);
  console.log(`Lender: ${lender.address}`);

  // Your contract deployment logic here...
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
