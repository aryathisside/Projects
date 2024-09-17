const hre = require("hardhat");

const tokens = (n) => {
    return BigInt(n) * BigInt(10 ** 18);
};

async function main() {
  // Setup accounts
  const [deployerSigner, buyerSigner, sellerSigner, inspectorSigner, lenderSigner] = await ethers.getSigners();

  // Addresses
//   const deployer = deployerSigner.address;
//   const buyer = buyerSigner.address;
//   const seller = sellerSigner.address;
//   const inspector = inspectorSigner.address;
//   const lender = lenderSigner.address;

//   console.log("deployer,buyer,seller,inspector,lender",deployer,buyer,seller,inspector,lender);
//   Deploy Real Estate
  const RealEstate = await ethers.getContractFactory('RealEstate');
  const realEstate = await RealEstate.deploy();
  const realEstateAddress = await realEstate.getAddress();

  const balance = await hre.ethers.provider.getBalance(seller)
  
  console.log(`balance: ${balance}`);
  console.log(`Deployed Real Estate Contract at: ${realEstateAddress}`);
  console.log(`Minting 10 properties...\n`);

  for (let i = 0; i < 3; i++) {
    const transaction = await realEstate.connect(sellerSigner).mint(`https://gateway.pinata.cloud/ipfs/QmPwAZBdv3JzFg7MijU5YpNXtLFeACehkFmwqDftUcx8r2/${i + 1}.json`);
    await transaction.wait();
  }

//   // Deploy Escrow
  const Escrow = await ethers.getContractFactory('Escrow',deployer);
  const escrow = await Escrow.deploy(
    realEstateAddress,
    seller,
    inspector,
    lender
  );

  const escrowAddress = await escrow.getAddress();

  console.log(`Deployed Escrow Contract at: ${escrowAddress}`);
  console.log(`Listing properties...\n`);

  for (let i = 1; i <= 10; i++) {
    // Approve properties
    let transaction = await realEstate.connect(seller).approve(escrowAddress, i);
    await transaction.wait();
    
    // Listing properties
    transaction = await escrow.connect(seller).list(i, buyer.address, tokens(2), tokens(1));
    await transaction.wait();
  }

  console.log(`Finished.`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
