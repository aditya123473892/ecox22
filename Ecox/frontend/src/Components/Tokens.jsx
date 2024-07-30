import { useSelector, useDispatch } from "react-redux"
import { backendUrl } from "../App"
import { dataActions } from "../store/data-slice";
import { useNavigate } from "react-router-dom";
import {  useEffect } from "react";

export default function Tokens(){

    const contracts = useSelector((state)=>state.data.contracts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getContracts();
    }, []);

    const getContracts = async()=>{
        try{
            const response = await fetch(`${backendUrl}/contract/getAll`);
            const data = await response.json();
            console.log('data:', data);
            if(data.success){
                dispatch(dataActions.setContracts(data.contracts));
            }
        }
        catch(err){
            console.log('error:', err);
        }
    }

    const handleRouting = (address)=>{
        console.log('address:', address);
        navigate(`/token/${address}`);
    };

    const handleNavigate = (contractAddress) => {
        navigate(`/auditor-login?contractAddress=${contractAddress}`);
    }

    return (
        <>
            <div className="text-2xl text-center font-semibold">Tokens MarketPlace</div>
            {contracts.length !== 0 ? (
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden my-4">
                    <thead className="bg-slate-800 text-gray-800 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Project / Institution</th>
                            <th className="py-3 px-6 text-left">Symbol</th>
                            <th className="py-3 px-6 text-left">Initial Supply</th>
                            <th className="py-3 px-6 text-left">Sale Price (ETH)</th>
                            <th className="py-3 px-6 text-left">Available Tokens</th>
                            <th className="py-3 px-6 text-center">Action</th>
                            <th className="py-3 px-6 text-center">Verification</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {contracts.map((contract, index) => (
                            <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.name}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.symbol}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.initialSupply}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{parseFloat(contract.salePrice, 4) * 84}$</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{contract.availableTokens}</td>
                                
                                <td className="py-3 px-6 text-center">
                                    {contract.verified ? (
                                        <button 
                                            onClick={() => handleRouting(contract.address)} 
                                            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full"
                                        >
                                            Buy
                                        </button>
                                    ) : (
                                        <span className="text-gray-400">Not Available</span>
                                    )}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className={`${contract.verified ? 'bg-blue-400 hover:bg-blue-500' : 'bg-green-400 hover:bg-green-500'} text-white font-semibold py-2 px-4 rounded-full`}
                                        onClick={() => handleNavigate(contract.address)}
                                    >
                                        {contract.verified ? 'Verified' : 'Verify'}
                                    </button>
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {contract.verified ? contract.auditorAccreditationNumber : 'Not verified'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}