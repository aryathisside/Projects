const { expect } = require('chai');
const exp = require('constants');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return BigInt(n) * BigInt(10 ** 18);
};


describe('Escrow', () => {
    let buyer, seller, inspector, lender
    // let marketplaceAccount
    // let marketplaceFee = 2
    let realEstate, escrow
    let realEstateAddress, escrowAddress

    beforeEach(async () => {
        // Setup accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners()
        console.log(buyer.address, seller.address, inspector.address, lender.address);  // Debug log
        // console.log(buyer.address, seller.address, inspector.address, lender.address, marketplaceAccount.address);  // Debug log

        // Deploy Real Estate
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy()
        realEstateAddress = await realEstate.getAddress()
        console.log("RealEstate Address:", realEstateAddress);  // Debug log

        // Mint 
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        let txn = await transaction.wait()

        console.log("Seller Address", seller.address);  // Debug log

        let totalSupply = await realEstate.totalSupply();
        console.log("Total supply:", totalSupply.toString()); // Check how many tokens are minted


        let owner = await realEstate.ownerOf(1);
        console.log("Owner of token 1:", owner);  // Should be seller's address

        // Deploy Escrow
        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy(
            realEstate.getAddress(),
            seller.address,
            inspector.address,
            lender.address
            // marketplaceAccount.address,
            // marketplaceFee
        )

        escrowAddress = await escrow.getAddress()

        console.log("escrowAddress Address:", escrowAddress);  // Debug log

        // Approve Property
        transaction = await realEstate.connect(seller).approve(escrow.getAddress(), 1)
        await transaction.wait()

        console.log("Seller Address", escrowAddress);  // Debug log

        let approvedAddress = await realEstate.getApproved(1);
        console.log("Approved address for token 1:", approvedAddress);  // Should be the escrow contract address

        // List Property
        transaction = await escrow.connect(seller).list(1, buyer.address, tokens(10), tokens(5))
        await transaction.wait()
    })

    describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const result = await escrow.nftAddress()
            console.log(result)

            expect(result).to.be.equal(realEstateAddress)
        })

        it('Returns seller', async () => {
            const result = await escrow.seller()
            console.log(result)

            expect(result).to.be.equal(seller.address)
        })

        it('Returns inspector', async () => {
            const result = await escrow.inspector()
            console.log(result)

            expect(result).to.be.equal(inspector.address)
        })

        it('Returns lender', async () => {
            const result = await escrow.lender()
            console.log(result)

            expect(result).to.be.equal(lender.address)
        })

        // it('Marketplace Address', async () =>{
        //     const result = await escrow.marketplaceAccount()
        //     expect(result).to.be.equal(marketplaceAccount.address)
        // })

        // it('Marketplace Fee', async () =>{
        //     const result = await escrow.marketplaceFee()
        //     expect(result).to.be.equal(marketplaceFee)
        // })

    })

    describe('Listing', () => {

        it('Updates as listed', async () => {
            const result = await escrow.isListed(1)
            expect(result).to.be.equal(true)
        })

        it('Returns Buyer', async () => {
            const result = await escrow.buyer(1)
            expect(result).but.be.equal(buyer.address)
        })

        it('Returns Purchase Price', async () => {
            const result = await escrow.purchasePrice(1)
            expect(result).to.be.equal(tokens(10))
        })

        it('Returns escrow amount', async () => {
            const result = await escrow.escrowAmount(1)
            expect(result).to.be.equal(tokens(5))
        })

        it('Updates ownership', async () => {
            const owner = await realEstate.ownerOf(1)
            expect(owner).to.be.equal(escrowAddress)
        })
    })

    describe('Deposits', () => {
        beforeEach(async () => {
            const transaction = await escrow.connect(buyer).depositEarnest(1, { value: tokens(5) })
            await transaction.wait()
        })

        it('Updates contract balance', async () => {
            const result = await escrow.getBalance()
            expect(result).to.be.equal(tokens(5))
        })
    })

    describe('Inspection', () => {
        beforeEach(async () => {
            const transaction = await escrow.connect(inspector).updateInspectionStatus(1, true)
            await transaction.wait()
        })

        it('Updates inspection status', async () => {
            const result = await escrow.inspectionPassed(1)
            expect(result).to.be.equal(true)
        })
    })


    describe('Approval', () => {
        beforeEach(async () => {
            let transaction = await escrow.connect(buyer).approveSale(1)
            await transaction.wait()

            transaction = await escrow.connect(seller).approveSale(1)
            await transaction.wait()

            transaction = await escrow.connect(lender).approveSale(1)
            await transaction.wait()
        })

        it('Updates approval status', async () => {
            expect(await escrow.approval(1, buyer.address)).to.be.equal(true)
            expect(await escrow.approval(1, seller.address)).to.be.equal(true)
            expect(await escrow.approval(1, lender.address)).to.be.equal(true)
        })
    })

    describe('Sale', () => {
        beforeEach(async () => {
            let transaction = await escrow.connect(buyer).depositEarnest(1, { value: tokens(5) });
            await transaction.wait();
    
            transaction = await escrow.connect(inspector).updateInspectionStatus(1, true);
            await transaction.wait();
    
            transaction = await escrow.connect(buyer).approveSale(1);
            await transaction.wait();
    
            transaction = await escrow.connect(seller).approveSale(1);
            await transaction.wait();
    
            transaction = await escrow.connect(lender).approveSale(1);
            await transaction.wait();
    
            // Check escrow balance before sending funds
            const escrowBalanceBefore = await ethers.provider.getBalance(escrowAddress);
            console.log("Escrow Balance Before Lending:", ethers.formatEther(escrowBalanceBefore));
    
            await lender.sendTransaction({ to: escrowAddress, value: tokens(5) });
    
            // Check escrow balance after sending funds
            const escrowBalanceAfter = await ethers.provider.getBalance(escrowAddress);
            console.log("Escrow Balance After Lending:", escrowBalanceAfter);
    
            transaction = await escrow.connect(seller).finalizeSale(1);
            await transaction.wait();
        });

        it('Updates ownership', async () => {
            const owner = await realEstate.ownerOf(1)
            expect(owner).to.be.equal(buyer.address)
        })

        it('Updates balance', async () => {
            expect(await escrow.getBalance()).to.be.equal(0)
        })

    // it('Transfers marketplace fee', async () => {
    //     const marketplaceBalance = await ethers.provider.getBalance(marketplaceAccount.address);
    //     const expectedFee = BigInt(tokens(10) * 2 / 100); // 2% of 10 tokens
    //     expect(marketplaceBalance.toString()).to.equal(expectedFee.toString());
    // });

    // it('Transfers correct amount to seller', async () => {
    //     const sellerBalance = await ethers.provider.getBalance(seller.address);
    //     const expectedAmount = BigInt(tokens(10)) - BigInt(tokens(10) * 2 / 100); // 10 tokens - 2% fee
    //     expect(sellerBalance.toString()).to.equal(expectedAmount.toString());
    // });
        
    })

})