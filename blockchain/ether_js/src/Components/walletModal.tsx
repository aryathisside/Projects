import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

type CustomModalProps = {
    onMetaMaskConnect: () => void;
    onPhantomConnect: () => void;
    onClose: () => void;
};

const CustomModal: React.FC<CustomModalProps> = ({ onClose, onMetaMaskConnect, onPhantomConnect }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Choose Wallet</h2>
        <Button onClick={onMetaMaskConnect}>Connect with MetaMask</Button>
        <Button onClick={onPhantomConnect}>Connect with Phantom</Button>
        <Button onClick={onClose} style={{ backgroundColor: "red" }}>
          Cancel
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomModal;
