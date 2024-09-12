import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { provider, walletAddress, walletAbi, walletContract } from '../Constants/contants';
import { useSyncProviders } from '../hooks/useSyncProviders';
import { formatAddress } from "../utils/index"

interface EIP6963ProviderDetail {
  provider: any; // Change `any` to the appropriate type if known
  info: {
    uuid: string;
    icon: string;
    name: string;
  };
}

const WriteBlockChain = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | undefined>(undefined);
  const [userAccount, setUserAccount] = useState<string>("");
  const providers = useSyncProviders();

  const readFunctions = async () => {
    try {
      const contractName = await walletContract.name();
      console.log("contractName", contractName);

      const num = await walletContract.getValue();
      console.log("num", num);

      const contractBalance = await walletContract.contractBalance();
      console.log("Contract Balance", contractBalance);

      const userBalance = await walletContract.accountBalance("0x284782d7c1325d9bc8266a2365c9d96327bf2f12");
      console.log("User Balance", userBalance);

      const balanceEth = ethers.formatEther(userBalance);
      console.log("balanceEth", balanceEth);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleContractFunction = async () => {
    try {
      let name = await walletContract.name();
      console.log("Name",name);
    } catch (error) {
      console.log("err",error)
    }
  }

  // const handleConnect = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      });

      setSelectedWallet(providerWithInfo);
      console.log("providerWithInfo",providerWithInfo);
      setUserAccount(accounts?.[0] || "");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {providers.length > 0 ? providers.map((provider: EIP6963ProviderDetail) => (
          <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
            <img src={provider.info.icon} alt={provider.info.name} />
            <div>{provider.info.name}</div>
          </button>
        )) : <div>No Announced Wallet Providers</div>}
      </div>
      {/* <div>
        <button onClick={handleConnect(providers[0])}>Connect Wallet</button>
      </div> */}
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount && selectedWallet && (
        <div>
          <div>
            <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
            <div>{selectedWallet.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
        </div>
      )}

      <div>
        <button onClick={handleContractFunction}>Get Name</button>
      </div>
    </>
  );
}

export default WriteBlockChain;
