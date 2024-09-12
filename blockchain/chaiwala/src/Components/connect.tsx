import React, { useEffect, useState } from 'react'
// import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { formatAddress } from "../utils/index";
const providers = useSyncProviders();

const Connect: React.FC = () => {

    const [connect, setConnect] = useState<boolean>(false);
    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
    const [userAccount, setUserAccount] = useState<string>("")

    const connectMetaMask = async (providerWithInfo: EIP6963ProviderDetail) => {
        const contractAddress = "";
        const contractABI = "";
        console.log("Adfg");

        if (!window.ethereum || !window.ethereum.isMetaMask) {
            alert("Please Install MetaMask");
            return;
        }

        try {
            // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
            });

            setUserAccount(accounts?.[0])
            setConnect(true);

            const provider = new ethers.providers.Web3Provider(window.ethereum);

        } catch (error) {
            console.error("MetaMask connection failed", error);
        }
    };
    useEffect(() => {
        connectMetaMask();
    }, [])

    return (

        <>
            <h2>Meta Mask</h2>
            <h3>Account: {userAccount}</h3>
            <button onClick={connectMetaMask}>connect</button>

            <div>
            {
            providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) :
            <div>
              No Announced Wallet Providers
            </div>
        }
            </div>
        </>

    )
}

export default Connect



