const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {
    let alphaTknContract, deployer, receiver, exchange

    beforeEach(async () => {

        [deployer, receiver, exchange] = await ethers.getSigners()
        const alphaTkn = await ethers.getContractFactory('AlphaTkn')
        alphaTknContract = await alphaTkn.deploy('Alpha', 'Alph', '1000000');
    })

    describe('Deployment', () => {
        const name = 'Alpha'
        const symbol = 'Alph'
        const decimals = '18'
        const totalSupply = tokens('1000000')

        it('has correct name', async () => {
            expect(await alphaTknContract.name()).to.equal(name)
        })

        it('has correct symbol', async () => {
            expect(await alphaTknContract.symbol()).to.equal(symbol)
        })

        it('has correct decimals', async () => {
            expect(await alphaTknContract.decimals()).to.equal(decimals)
        })

        it('has correct total supply', async () => {
            expect(await alphaTknContract.totalSupply()).to.equal(totalSupply)
        })

        it('assigns total supply to deployer', async () => {
            expect(await alphaTknContract.balanceOf(deployer.address)).to.equal(totalSupply)
        })

    })

    describe('Sending Tokens', async () => {
        let value = tokens(100), transaction;
        const totalSupply = tokens('1000000')
        it("Here", async() =>{
            await expect(alphaTknContract.transfer(receiver, 1000)).to.changeTokenBalances(
                alphaTknContract,
                [deployer.address, receiver.address],
                [-1000, 1000]
              );
        })
  
        // beforeEach(async () => {
        //     const txn = await alphaTknContract.connect(deployer).transfer(receiver, value)
        //     transaction = await txn.wait()
        // })
        // it('Check Balance of Sender', async () => {
        //     const result = await alphaTknContract.balanceOf(deployer.address);
        //     expect(result).to.be.greaterThanOrEqual(value)
        // })

        // it('Check Sender Balance', async () => {
        //     const result = await alphaTknContract.balanceOf(deployer.address)
        //     expect(result).to.be.equal(totalSupply - tokens(100))
        // })

        // it('Check balance of receiver', async () => {
        //     const result = await alphaTknContract.balanceOf(receiver.address)
        //     expect(result).to.be.equal(value)
        // })

    })


    describe('Failure', () => {
        it('rejects insufficient balances', async () => {
            const invalidAmount = tokens(100000000)
            await expect(alphaTknContract.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
        })

        it('rejects invalid recipent', async () => {
            const amount = tokens(100)
            await expect(alphaTknContract.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
        })
    })

    describe('Approve', async () => {
        let amount = tokens(100), transaction;

        beforeEach('Approval', async () => {
            const txn = await alphaTknContract.connect(deployer).approve(exchange.address, amount)
            transaction = await txn.wait()
        })

        describe('Success', async () => {
            it('Amount should be more than 0', async () => {
                expect(amount).to.be.greaterThan(tokens(0))
            })

            it('Check Approval', async () => {
                const result = await alphaTknContract.allowance(deployer.address, exchange.address)
                expect(result).to.be.equal(amount)
            })

            it('Check Approval', async () => {
               await expect(alphaTknContract.approve(exchange.address,amount)).to.emit(alphaTknContract, "Approval")
            })
            
        })

        describe('Failure', async() => { 
            it('rejects invalid address', async () => {
                await expect(alphaTknContract.connect(deployer).approve('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
            })

         })

    })


    describe('Delegated Token Transfers', async() =>{
        let amount = tokens(100), transaction;

        beforeEach(async() =>{
            const txn = await alphaTknContract.connect(deployer).approve(exchange.address, amount)
            await txn.wait()
        })

        it('Value Check',async() =>{
            const result = await alphaTknContract.balanceOf(deployer.address)
            expect(result).to.be.greaterThanOrEqual(amount)
        })

        it('Allowance Check',async() =>{
            const result = await alphaTknContract.allowance(deployer.address, exchange.address)
            expect(result).to.be.greaterThanOrEqual(amount)
        })
    })

    describe('Delegated Token Transfers', () => {
        let amount, transaction, result
    
        beforeEach(async () => {
          amount = tokens(100)
          transaction = await alphaTknContract.connect(deployer).approve(exchange.address, amount)
          result = await transaction.wait()
        })
    
        describe('Success', () => {
          beforeEach(async () => {
            transaction = await alphaTknContract.connect(exchange).transferFrom(deployer.address, receiver.address, amount)
            result = await transaction.wait()
          })
    
          it('transfers token balances', async () => {
            expect(await alphaTknContract.balanceOf(deployer.address)).to.be.equal(tokens(999900))
            expect(await alphaTknContract.balanceOf(receiver.address)).to.be.equal(amount)
          })
    
          it('rests the allowance', async () => {
            expect(await alphaTknContract.allowance(deployer.address, exchange.address)).to.be.equal(0)
          })
    
          it('emits a Transfer event', async () => {
            // await expect(alphaTknContract.connect(exchange).transferFrom(deployer.address,receiver.address,amount)).to.emit(alphaTknContract,"Transfer")
            expect(transaction).to.emit(alphaTknContract,"Transfer")
        })
    
        })
    
        describe('Failure', async () => {
          // Attempt to transfer too many tokens
          const invalidAmount = tokens(100000000) // 100 Million, greater than total supply
          await expect(alphaTknContract.connect(exchange).transferFrom(deployer.address, receiver.address, invalidAmount)).to.be.reverted
        })
    
      })


})
