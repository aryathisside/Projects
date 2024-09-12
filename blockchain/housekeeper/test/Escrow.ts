import { expect } from 'chai';
import { Address } from 'cluster';
import exp from 'constants';
import { Escrow, RealEstate } from '../typechain-types'; // Adjust the path to the generated types

// const { ethers } = require("hardhat");

describe('Escrow', function () {
  let buyer:any,seller:any,inspector:any, lender:any;
  let realEstate:RealEstate, escrow:Escrow;
  let realEstateAddress:any;

  beforeEach(async ()=> {
    [buyer, seller, inspector, lender] = await ethers.getSigners();

    const RealEstateFactory = await ethers.getContractFactory('RealEstate');
    realEstate = await RealEstateFactory.deploy();
    realEstateAddress  = await realEstate.getAddress();

    //Mint
    let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png");
    await transaction.wait();

    const Escrow  = await ethers.getContractFactory('Escrow');
    escrow = await Escrow.deploy(realEstateAddress,seller.address,inspector.address, lender.address);

  })
  
  describe('Deployment', () => {
    it('Returns NFT address', async () => {
        const result = await escrow.nftAddress()
        expect(result).to.be.equal(realEstateAddress)
    })

    it('Returns seller', async () => {
        const result = await escrow.seller()
        expect(result).to.be.equal(seller.address)
    })

    it('Returns inspector', async () => {
        const result = await escrow.inspector()
        expect(result).to.be.equal(inspector.address)
    })

    it('Returns lender', async () => {
        const result = await escrow.lender()
        expect(result).to.be.equal(lender.address)
    })
})


});
