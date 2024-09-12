import React, { useState } from "react";
import { ethers } from "ethers";
import CustomModal from "./walletModal"; 
import Web3Modal from "web3modal";


// Assuming you placed it in the same directory
import { provider, walletAddress, walletAbi, walletContract } from '../Constants/contants';

const Ether: React.FC = () => {
    const [currentAccount, setCurrentAccount] = useState<string>('');
    const [connect, setConnect] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const connectMetaMask = async () => {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            alert("Please Install MetaMask");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            setConnect(true);
            setIsModalOpen(false);
        } catch (error) {
            console.error("MetaMask connection failed", error);
        }
    };

    const connectPhantom = async () => {
        if (!window.solana || !window.solana.isPhantom) {
            alert("Please Install Phantom");
            return;
        }

        try {
            const provider = window.solana;
            const response = await provider.connect();
            setCurrentAccount(response.publicKey.toString());
            setConnect(true);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Phantom connection failed", error);
        }
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>Connect Wallet</button>
            {isModalOpen && (
                <CustomModal
                    onClose={() => setIsModalOpen(false)}
                    onMetaMaskConnect={connectMetaMask}
                    onPhantomConnect={connectPhantom}
                />
            )}
            {connect && <p>Connected Account: {currentAccount}</p>}
        </>
    );
};

// export default Ether;
