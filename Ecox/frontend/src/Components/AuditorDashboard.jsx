import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { backendUrl } from "../App";
import { dataActions } from "../store/data-slice";
// import { useNavigate } from "react-router-dom";
import "../Components/ui/AuditorLogin";
import Web3 from 'web3';
import OneTimeSaleToken from '../../../backend/contracts/OneTimeSaleToken.json';

function AuditorDashboard() {
    const contracts = useSelector((state) => state.data.contracts);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [clickedButtons, setClickedButtons] = useState({});
    const user = useSelector((state) => state.auth.user);
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        getContracts();
        initializeWeb3();
    }, []);

    const initializeWeb3 = async () => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (window.web3) {
            setWeb3(new Web3(window.web3.currentProvider));
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    const getContracts = async () => {
        try {
            const response = await fetch(`${backendUrl}/contract/getAll`);
            const data = await response.json();
            if (data.success) {
                dispatch(dataActions.setContracts(data.contracts));
            }
        } catch (err) {
            console.error('Error fetching contracts:', err);
        }
    };

    // const handleRouting = (address) => {
    //     navigate(`/token/${address}`);
    // };

    const handleVerify = async (contractIndex) => {
      if (!web3) {
          alert("Please install MetaMask to verify contracts.");
          return;
      }

      try {
          const accounts = await web3.eth.getAccounts();
          if (accounts.length === 0) {
              alert("Please connect your MetaMask account.");
              return;
          }

          const contract = contracts[contractIndex];
          
          const contractInstance = new web3.eth.Contract(OneTimeSaleToken.abi, contract.address);

          // Perform some checks on the contract
          const [name, symbol, totalSupply, salePrice] = await Promise.all([
              contractInstance.methods.name().call(),
              contractInstance.methods.symbol().call(),
              contractInstance.methods.totalSupply().call(),
              contractInstance.methods.salePrice().call()
          ]);

          // Log contract details (you can remove this in production)
          console.log(`Verifying contract ${name} (${symbol}):`);
          console.log(`Total Supply: ${totalSupply}`);
          console.log(`Sale Price: ${web3.utils.fromWei(salePrice, 'ether')} ETH`);

          // Register the auditor (this action serves as the "verification" process)
          await contractInstance.methods.registerAuditor(
              user.name,
              "auditor@example.com", 
              user.accreditationNumber
          ).send({ from: accounts[0] });

          // Update the UI
          const updatedContracts = contracts.map((c, index) =>
              index === contractIndex ? { ...c, verified: true } : c
          );
          dispatch(dataActions.setContracts(updatedContracts));
          setClickedButtons((prev) => ({ ...prev, [contractIndex]: true }));

          alert("Contract verified successfully!");
        
      } catch (error) {
          console.error("Error verifying contract:", error);
          alert(`Error verifying contract: ${error.message}`);
      }

   
  };

    return (
        <>
            <div className="text-2xl text-center font-semibold">Tokens MarketPlace</div>
            <div>
                {user ? (
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Accreditation Number: {user.accreditationNumber}</p> 
                    </div>
                ) : (
                    <p>No user logged in</p>
                )}
            </div>
            {contracts.length !== 0 && (
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden my-4">
                    <thead className="bg-slate-800 text-gray-800 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Project / Institution</th>
                            <th className="py-3 px-6 text-left">Symbol</th>
                            <th className="py-3 px-6 text-left">Initial Supply</th>
                            <th className="py-3 px-6 text-left">Sale Price (ETH)</th>
                            <th className="py-3 px-6 text-left">Available Tokens</th>
                            <th className="py-3 px-6 text-center">Verification</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {contracts.map((contract, index) => (
                            <tr className="border-b border-gray-400 hover:bg-gray-400" key={index}>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.name}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.symbol}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.initialSupply}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{parseFloat(contract.salePrice, 4) * 84}$</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.availableTokens}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className={`bg-${contract.verified || clickedButtons[index] ? 'gray-400' : 'green-400'} hover:bg-${contract.verified || clickedButtons[index] ? 'gray-500' : 'green-500'} text-black font-semibold py-2 px-4 rounded-full`}
                                        onClick={() => handleVerify(index)}
                                        disabled={contract.verified || clickedButtons[index]}
                                    >
                                        {contract.verified || clickedButtons[index] ? 'Verified' : 'Verify'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {  contracts.length === 0 &&  <div>Loading...</div>}
        </>
    );
}

export default AuditorDashboard;