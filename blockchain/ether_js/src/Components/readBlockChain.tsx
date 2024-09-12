import React, { useState } from 'react'
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/34ba6d02f59847c58807788926d21685`);

const ReadBlockChain: React.FC = () => {

    const [blockNumber, setBlockNumber] = useState<number | null>(null);
    const [balance, setBalance] = useState<any>(0);
    const fetchBlockNumber = async () => {

        const blockNumber = await provider.getBlockNumber();
        setBlockNumber(blockNumber);
    }

    const accBalance = async () => {
        try {
            // Correct the address to a valid Ethereum address
            const address = '0xa83114A443dA1CecEFC50368531cACE9F37fCCcb'; // Example correct address
            const bal = await provider.getBalance(address);
            const balanceEth = ethers.formatEther(bal);
            setBalance(balanceEth);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }

        // setBalance(balanceEth);
    }
    return (
        <>  
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20px", gap: "20px" }}>

            <div>
                <button onClick={fetchBlockNumber}>Fetch Block Number</button>
                <br />
                <br />
                {`BlockNumber is: ${blockNumber}`}
            </div>
            <div>
                <button onClick={accBalance}>Balance</button>
                <br />
                <br />
                {`Balance is: ${balance}`}
            </div>
        </div>

        </>
    )
}

export default ReadBlockChain;