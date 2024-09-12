import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { provider, walletAddress, walletAbi, walletContract } from '../Constants/contants';
import styled from "styled-components";
import ethImage from '../images/eth.png';
import userImage from '../images/user.png';


const Ether: React.FC = () => {
    const [currentAccount, setCurrentAccount] = useState<string>('');
    const [connect, setConnect] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const checkWallet = async () => {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            alert("Please Install MetaMask");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            }
        } catch (error) {
            console.error("MetaMask connection failed", error);
        }
    };

    const connectWallet = async () => {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            alert("Please Install MetaMask");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });


            setCurrentAccount(accounts[0]);
            window.location.reload();

        } catch (error) {
            console.error("MetaMask connection failed", error);

        }
    }

    useEffect(() => {
        checkWallet();
    })

    useEffect(() =>{
        async function accountChanged() {
            window.ethereum.on("Accounts Changed", async function () {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else{
                window.location.reload();
            }
            });
        }
        accountChanged();
    }, []);



    return (
        <>
            <CardContainer>
                {!currentAccount ? "" : <Pro >PRO</Pro>}
                <img src={userImage} alt="user image" width={80} height={80} />
                <h3>Check Ether</h3>

                {!currentAccount ? (
                    <div>
                        <Message>
                            <p>
                                MetaMask connection failed
                            </p>
                        </Message>
                        <img src={ethImage} alt="image" width={100} height={100}/>
                        <p>Welcome to Ether Account Balance Checker</p>
                    </div>
                ):(
                    <>
                    
                    <h6>
                        Verified <Tick> &#10004;</Tick>
                    </h6>
                    <p>
                     Ether account and balance checker <br /> find account details.
                    </p>
                    <BUTTONS onClick={() => {}}>
                        Enter Account Details
                    </BUTTONS>
                    </>

                )}

                {!currentAccount && !connect ? (
                    <BUTTON onClick={() => connectWallet()}>
                        Connect Wallet
                    </BUTTON>
                ):(
                    <Skills>
                        <h6>Your Ether</h6>
                        <ul>


                        <li>Accounts</li>
                        <li>{currentAccount}</li>
                        <li>Balance</li>
                        <li> 0 </li>
                        </ul>
                    </Skills>
                )}

                
            </CardContainer>

        </>
    );
};

export default Ether;

const CardContainer = styled.div`
    background-color: #231e39;
    border-radius: 25px;
    box-shadow: 10px 10px 15px rgba(0,0,0,0.35);

    color: #b3b8cd;
    padding: 30px 0 0;
    position: relative;
    width: 350px;
    max-width: 100%;

    text-align: center;
    margin: 20px;
`

const Pro = styled.span`
    color: #231e39;
    background-color: #febb0b;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    padding: 3px 7px;
    position: absolute;
    top: 30px;
    left: 30px;
`

const Tick = styled.span`
    color: #231e39;
    background-color: #febb0b;
    border-radius: 50%;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 5px;
    top: 30px;
    left: 30px;
    margin-left: .3rem;
`


const Message = styled.div`
    position: absolute;
    top: -30%;
    margin-left: 0;
    background-color: #1f1a36;
    padding: 1rem 3rem;
    border-radius: 1rem;
    box-shadow: 10px 10px 15pxrgba(0,0,0,0.35);
`

const BUTTON = styled.button`
    background-color: #c400d7;
    border: 1px solid #c400d7;
    border-radius: 3px;
    color: #fff;
    font-weight: 500;
    padding: 10px 25px;
    cursor: pointer;
`


const BUTTONS = styled.button`
    background-color: #c400d7;
    color: #c400d7;
`

const Skills = styled.div`
    background-color: #1f1a36;
    text-align: left;
    padding: 15px;
    margin-top: 30px;

    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
    
        li{
            border: 1px solid #2d2747;
            border-radius: 2px;
            display: inline-block;
            font-size: 12px;
            margin: 0 7px 7px 0;
            padding: 7px;
        }
    }
`