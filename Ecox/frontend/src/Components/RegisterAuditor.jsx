import React, { useEffect, useState } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { cn } from "../utils/cn";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/data-slice";
import { backendUrl } from "../App";
import Web3 from "web3";
import OneTimeSaleToken from '../../../backend/contracts/OneTimeSaleToken.json';
import { useNavigate } from 'react-router-dom';

export function RegisterAuditor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [audiNo, setAuditor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [metaMaskAddress, setMetaMaskAddress] = useState("");
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.data.walletAddress);
  const navigate = useNavigate();

  
  const connectWallet = async () => {
    if (window.ethereum) {
      console.log("MetaMask detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(dataActions.setWalletAddress(accounts[0]));
        setMetaMaskAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setErrorMessage("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      setErrorMessage("MetaMask not detected. Please install MetaMask to use this feature.");
    }
  };

  useEffect(() => {
    if (!walletAddress) {
      connectWallet();
    }
  }, [walletAddress]);

  async function sendMetaDataAudi() {
    const bodyData = {
      desc: name,
      AudiNo: audiNo,
    };

    try {
      const response = await fetch(`${backendUrl}/metaDataAudi/upload`, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();
      if (res.success) {
        console.log("Metadata upload successful:", res.metaDataAudi);
        return res.metaDataAudi;
      } else {
        throw new Error(res.message || "Unknown error occurred on the backend");
      }
    } catch (e) {
      console.error("Error sending metadata:", e);
      throw e;
    }
  }

  const initiateRegistrationTransaction = async (name, email, accreditationNumber, walletAddress) => {
    if (!walletAddress) {
      throw new Error("Wallet not connected. Please connect your MetaMask wallet.");
    }

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0xEEDd8EB6D2522e582b4ffE8cDa7E536047c646F4";
    
    const contract = new web3.eth.Contract(OneTimeSaleToken.abi, contractAddress);

    try {
      console.log("Sending transaction...");
      const result = await contract.methods
        .registerAuditor(name, email, accreditationNumber)
        .send({
          from: walletAddress,
        });

      console.log("Transaction result:", result);
      return result;
    } catch (error) {
      console.error("Transaction failed", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!metaMaskAddress) {
      setErrorMessage("Please connect your MetaMask wallet first.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Starting registration process...");
      const metaDataAudi = await sendMetaDataAudi();
      if (metaDataAudi) {
        const transactionResult = await initiateRegistrationTransaction(name, email, audiNo, metaMaskAddress);
        console.log("Registration successful. Transaction hash:", transactionResult.transactionHash);
        alert("Registration transaction successful! Transaction hash: " + transactionResult.transactionHash);
      
      } else {
        throw new Error("Failed to upload metadata");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.message.includes("User denied transaction signature")) {
        setErrorMessage("Transaction was rejected in MetaMask. Please try again.");
      } else if (error.message.includes("insufficient funds")) {
        setErrorMessage("Insufficient funds to cover gas fees. Please add more ETH to your wallet.");
      } else {
        setErrorMessage("Registration failed: " + (error.message || "Unknown error occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Auditor Registration
          </h2>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="projectName">Name</Label>
              <Input
                id="projectName"
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="projectSymbol">Email</Label>
              <Input
                id="projectSymbol"
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="accreditationNumber">Accreditation Number</Label>
              <Input
                id="accreditationNumber"
                placeholder="Enter your accreditation number"
                type="text"
                value={audiNo}
                onChange={(e) => setAuditor(e.target.value)}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="metaMaskAddress">MetaMask Address</Label>
              <Input
                id="metaMaskAddress"
                type="text"
                value={metaMaskAddress}
                readOnly
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Register"}
              <BottomGradient />
            </button>
     
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
          <p> Already a Auditor</p>
          <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}  onClick={()=>navigate('/auditor-login')}
            >
             Login as Auditor
              <BottomGradient />
            </button>
      
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default RegisterAuditor;
